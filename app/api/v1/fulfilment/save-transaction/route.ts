import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //check user session
  const session = await getServerSession(options)

  // if user is not logged in, return unauthorized response
  // if (!session) {
  //   return new NextResponse(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  // if user is logged in, continue to process the request
  try {
    const body = await req.json()
    const {
      transactionId,
      firstName,
      lastName,
      bookingType,
      email,
      phoneNumber,
      budget
    } = body


    //validate required fields
    const requiredFields = [
      "transactionId",
      "firstName",
      "lastName",
      "bookingType",
      "email",
      "phoneNumber",
      "budget"
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }

    //connect to database
    const client = await clientPromise;
    const db = client.db();
    const payment = db.collection("save-transaction");

    //process the request data here...
    const newPayment = {
      transactionId,
      firstName,
      lastName,
      bookingType,
      email,
      phoneNumber,
      budget,
      createdAt: new Date(),
      // createdBy: session.user.id
    };

    await payment.insertOne(newPayment);

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