import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  // Check user session
  // if (!session) {
  //   console.log("No active session");
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  try {
    // Parse booking data from the request body
    const body = await req.json();

    const {
      name,
      budget,
      phoneNumber,
      email,
      dateOfArrival,
      timeOfArrival,
      additionalInfo,
      isBookingForSelf,
      bookingForName,
      bookingForPhone
    } = body;

    // Check required fields
    const requiredFields = [
      "name",
      "budget",
      "phoneNumber",
      "email",
      "dateOfArrival",
      "timeOfArrival",
      "additionalInfo",
      "isBookingForSelf",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }

    // Additional validation for bookingForName and bookingForPhone
    if (!isBookingForSelf) {
      if (!bookingForName || !bookingForPhone) {
        return new Response(
          JSON.stringify({ message: "Missing required fields for booking for someone else" }),
          { status: 400 }
        );
      }
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const accommodation = db.collection("accommodation");

    // Create a new booking object
    const accommodationBooking: {
      name: string;
      budget: number;
      phoneNumber: string;
      email: string;
      dateOfArrival: string;
      timeOfArrival: string;
      additionalInfo: string;
      paymentStatus: string;
      createdAt: Date;
      updatedAt: Date;
      isBookingForSelf: boolean;
      bookingForName?: string;
      bookingForPhone?: string;
    } = {
      name,
      budget,
      phoneNumber,
      email,
      dateOfArrival,
      timeOfArrival,
      additionalInfo,
      paymentStatus: "not paid",
      createdAt: new Date(),
      updatedAt: new Date(),
      isBookingForSelf,
    };

    // Include bookingForName and bookingForPhone if not booking for self
    if (!isBookingForSelf) {
      accommodationBooking.bookingForName = bookingForName;
      accommodationBooking.bookingForPhone = bookingForPhone;
    }

    // Insert the new booking into the database
    const data = await accommodation.insertOne(accommodationBooking);

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
