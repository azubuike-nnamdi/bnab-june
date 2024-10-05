import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/db';

const { PAYSTACK_HOSTNAME, PAYSTACK_SECRET_KEY } = process.env;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('reference'); // Rename reference to transactionId
    console.log('Transaction ID:', transactionId);

    if (!transactionId) {
      return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 });
    }

    const response = await axios.get(
      `https://${PAYSTACK_HOSTNAME}/transaction/verify/${transactionId}`,
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
    const transaction = await db.collection('payment-history').findOne({ transactionId }); // Use transactionId
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 422 });
    }

    // Check if the transactionId matches and the amount (budget) in the database matches the Paystack response
    const isReferenceMatching = transaction.transactionId === paystackTransaction.reference; // Compare with transactionId
    const isAmountMatching = transaction.budget === paystackTransaction.amount;

    if (!isReferenceMatching || !isAmountMatching) {
      return NextResponse.json({
        message: 'We are unable to confirm your transaction, please contact the administrator for support!'
      }, { status: 400 });
    }

    // If reference and amount match, update the transaction status depending on the status from Paystack and set count to 1
    await db.collection('payment-history').updateOne(
      { transactionId: paystackTransaction.reference }, // Use transactionId
      {
        $set: {
          transaction_status: paystackTransaction.status, // Dynamically update the status from Paystack
          count: 1 // Set count to 1
        }
      }
    );

    // If the booking type is ticket-master, decrease the noOfTickets in the all-ticketmaster-event collection
    if (transaction.bookingType === 'ticket-master' && transaction.event) {
      console.log('Attempting to update ticket count for event:', transaction.event);

      const eventId = transaction.event._id;
      const updateResult = await db.collection('all-ticketmaster-event').updateOne(
        { _id: eventId },
        { $inc: { noOfTickets: - 1 } }
      );

      if (updateResult.modifiedCount === 0) {
        console.warn(`Failed to update ticket count for event ${eventId}`);
      }
    }

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
