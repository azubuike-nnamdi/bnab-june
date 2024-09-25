import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/db';

const { PAYSTACK_HOSTNAME, PAYSTACK_SECRET_KEY } = process.env;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ message: 'Reference is required' }, { status: 400 });
    }

    const response = await axios.get(
      `https://${PAYSTACK_HOSTNAME}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const paystackTransaction = response.data.data;

    // Connect to database
    const client = await clientPromise;
    const db = client.db();

    // Log the response from Paystack to the 'verify-transaction-log' collection
    await db.collection('verify-transaction-log').insertOne(paystackTransaction);

    // Fetch the transaction from the 'payment-history' collection
    const transaction = await db.collection('payment-history').findOne({ reference });
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    // Check if the reference matches and the amount (budget) in the database matches the Paystack response
    const isReferenceMatching = transaction.reference === paystackTransaction.reference;
    const isAmountMatching = transaction.budget === paystackTransaction.amount;

    if (!isReferenceMatching || !isAmountMatching) {
      return NextResponse.json({
        message: 'We are unable to confirm your transaction, please contact the administrator for support!'
      }, { status: 400 });
    }


    // If reference and amount match, update the transaction status to depending on the status from paystack and set count to 1
    await db.collection('payment-history').updateOne(
      { reference: paystackTransaction.reference }, // find the document by reference
      {
        $set: {
          transaction_status: paystackTransaction.status, // dynamically update the status from Paystack
          count: 1 // set count to 1
        }
      }
    );
    return NextResponse.json({
      message: "Transaction verified",
      paystackTransaction
    }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        message: "An error occurred while verifying the transaction",
        error: error.response?.data || error.message
      }, { status: error.response?.status ?? 500 });
    }
    return NextResponse.json({
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}