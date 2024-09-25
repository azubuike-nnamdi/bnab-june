import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { sanitize } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// // Enhanced validation function
// const validateIpn = (data: any): boolean => {
//   // Add more comprehensive checks based on your payment provider's requirements
//   const requiredFields = ['transaction_id', 'status', 'amount', 'currency', 'customer_email'];
//   const hasAllRequiredFields = requiredFields.every(field => data.hasOwnProperty(field));
//   const isStatusValid = data.status === 'success';
//   const isAmountValid = typeof data.amount === 'number' && data.amount > 0;

//   return hasAllRequiredFields && isStatusValid && isAmountValid;
// };

// // Enhanced processing function with better error handling and logging
// const processIpnData = async (data: any) => {
//   const client = await clientPromise;
//   const db = client.db();
//   const paymentCollection = db.collection("payment-history");

//   try {
//     const existingTransaction = await paymentCollection.findOne({
//       transactionId: data.transaction_id,
//     });

//     if (!existingTransaction) {
//       console.error(`Transaction with ID ${data.transaction_id} not found.`);
//       return false;
//     }

//     // Check for idempotency
//     if (existingTransaction.transaction_status === "successful") {
//       console.log(`Transaction ${data.transaction_id} already processed. Skipping.`);
//       return true;
//     }

//     const updateResult = await paymentCollection.updateOne(
//       { transactionId: data.transaction_id },
//       {
//         $set: {
//           transaction_status: "successful",
//           amount_confirmed: data.amount,
//           updated_at: new Date()
//         }
//       }
//     );

//     if (updateResult.modifiedCount === 1) {
//       console.log(`Transaction status updated to successful for ID: ${data.transaction_id}`);
//       return true;
//     } else {
//       console.error(`Failed to update transaction status for ID: ${data.transaction_id}`);
//       return false;
//     }
//   } catch (error) {
//     console.error(`Error processing transaction ${data.transaction_id}:`, error);
//     return false;
//   }
// };

// Enhanced POST handler with rate limiting and better error handling
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json()
  // const session = getServerSession(options)
  console.log(data)
  return NextResponse.json(data)

  // Apply rate limiting
  // const { success } = await rateLimit(req);
  // if (!success) {
  //   return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  // }

  // try {
  //   const ipnData = await req.json();
  //   console.log('Received IPN:', JSON.stringify(ipnData));

  //   const isValid = validateIpn(ipnData);

  //   if (!isValid) {
  //     console.error('Invalid IPN received:', JSON.stringify(ipnData));
  //     return NextResponse.json({ message: 'Invalid IPN' }, { status: 400 });
  //   }

  //   const isProcessedSuccessfully = await processIpnData(ipnData);

  //   if (!isProcessedSuccessfully) {
  //     return NextResponse.json({ message: 'Failed to process transaction' }, { status: 500 });
  //   }

  //   return NextResponse.json({ message: 'IPN received and processed successfully' }, { status: 200 });
  // } catch (error) {
  //   console.error('Error processing IPN:', error);
  //   return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  // }
}

// Enhanced GET handler with input sanitization and pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trxref = searchParams.get("trxref") ?? searchParams.get("reference");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);

  if (!trxref) {
    return NextResponse.json({ message: "Transaction reference is required" }, { status: 400 });
  }

  // Simple input sanitization
  const sanitizedTrxref = sanitize(trxref);

  if (!sanitizedTrxref) {
    return NextResponse.json({ message: "Invalid transaction reference format" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const paymentCollection = db.collection("payment-history");

    const transaction = await paymentCollection.findOne({ transactionId: sanitizedTrxref });

    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({
      transactionId: transaction.transactionId,
      amountPaid: transaction.amountPaid,
      status: transaction.transaction_status,
      paymentMethod: transaction.paymentMethod,
      date: transaction.createdAt,
    }, { status: 200 });
  } catch (error) {
    console.error("Error querying transaction:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}