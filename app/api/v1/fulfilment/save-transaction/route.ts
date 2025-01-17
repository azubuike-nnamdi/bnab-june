import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { Payment } from "@/types/declaration";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Check user session
  const session = await getServerSession(options);

  // if user is not logged in, return unauthorized response
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Session not active" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    console.log('body', body);
    const {
      transactionId,
      firstName,
      lastName,
      bookingType,
      email,
      phoneNumber,
      budget,
      event,
      price,
      ticketType,
      ticketId,
      quantity
    } = body;

    // Validate required fields
    const requiredFields = [
      "transactionId",
      "firstName",
      "lastName",
      "bookingType",
      "email",
      "phoneNumber",
      "budget"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }


    // Additional validation for ticket-master booking type
    if (bookingType === "ticket-master" && !event) {
      return new NextResponse(JSON.stringify({ message: "Event information is required for your bookings" }), {
        status: 400,
      });
    }
    // Connect to database
    const client = await clientPromise;
    const db = client.db();
    const paymentCollection = db.collection("payment-history");

    // Check if the transactionId already exists
    const existingTransaction = await paymentCollection.findOne({ transactionId });

    if (existingTransaction) {
      return new NextResponse(
        JSON.stringify({ message: 'Transaction with this ID already exists' }),
        { status: 409 } // 409 Conflict status
      );
    }

    // Process the request data and insert the new record
    const newPayment: Payment = {
      transactionId,
      firstName,
      lastName,
      bookingType,
      ticketType,
      ticketId,
      email,
      phoneNumber,
      budget,
      price,
      quantity,
      transaction_status: "initiate",
      createdAt: new Date(),
      count: 0,
      // createdBy: session.user.id
    };

    // Include event information for ticket-master bookings
    if (bookingType === "ticket-master") {
      newPayment.event = event;
    }

    await paymentCollection.insertOne(newPayment);

    return new NextResponse(JSON.stringify({ message: 'Transaction saved successfully' }), {
      status: 201,
    });

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error saving transaction information' }),
      { status: 500 }
    );
  }
}
