import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options)

  //cher user session
  // if (!session) {
  //   console.log("No active session");
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  // Handle POST request
  try {
    const body = await req.json();

    const {
      name,
      budget,
      phoneNumber,
      email,
      dateOfArrival,
      timeOfArrival,
      additionalInfo
    } = body;

    //check required fields
    const requiredFields = [
      "name",
      "budget",
      "phoneNumber",
      "email",
      "dateOfArrival",
      "timeOfArrival",
      "additionalInfo",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }

    //connect to db
    const client = await clientPromise
    const db = client.db()
    const accommodation = db.collection('accommodation')

    //insert data into db'
    const accommodationBooking = {
      name,
      budget,
      phoneNumber,
      email,
      dateOfArrival,
      timeOfArrival,
      additionalInfo,
      paymentStatus: 'not paid',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const data = await accommodation.insertOne(accommodationBooking)

    if (data.insertedId) {
      return new Response(JSON.stringify({ message: "Booking successful" }), {
        status: 201,
      });
    } else {
      return new Response(JSON.stringify({ message: "Booking failed" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}


//GET METHOD

export async function GET(req: NextRequest) {
  const session = await getServerSession(options)

  // Check user session
  // if (!session) {
  //   console.log("No active session");
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  try {
    const client = await clientPromise;
    const db = client.db();
    const accommodation = db.collection("accommodation");

    const accommodationBookings = await accommodation.find().toArray();
    return new Response(JSON.stringify(accommodationBookings), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}