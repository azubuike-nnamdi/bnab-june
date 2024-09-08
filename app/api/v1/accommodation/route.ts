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
      firstName,
      lastName,
      budget,
      accommodationType,
      phoneNumber,
      email,
      dateOfArrival,
      timeOfArrival,
      departureDate,
      additionalInfo,
      isBookingForSelf,
      bookingForName,
      bookingForPhone
    } = body;

    // Check required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "budget",
      "phoneNumber",
      "accommodationType",
      "email",
      "dateOfArrival",
      "departureDate",
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
      firstName: string;
      lastName: string;
      budget: number;
      accommodationType: string;
      phoneNumber: string;
      email: string;
      dateOfArrival: string;
      timeOfArrival: string;
      departureDate: string;
      additionalInfo: string;
      paymentStatus: string;
      createdAt: Date;
      updatedAt: Date;
      isBookingForSelf: boolean;
      bookingForName?: string;
      bookingForPhone?: string;
    } = {
      firstName,
      lastName,
      budget,
      phoneNumber,
      email,
      accommodationType,
      dateOfArrival,
      timeOfArrival,
      departureDate,
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
