
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getEmailContent } from "@/lib/emailContent";
import { sendEmail } from "@/lib/sendEmail";


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
      phoneNumber,
      email,
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime,
      numberOfPassengers,
      additionalInfo,
    } = body;

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "pickUpLocation",
      "pickUpDate",
      "pickUpTime",
      "dropOffLocation",
      "dropOffDate",
      "dropOffTime",
      "numberOfPassengers",
      "additionalInfo",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ message: `Missing required field: ${field}` }), {
          status: 401,
        });
      }
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const bookings = db.collection("bookings");

    // Create a new booking object
    const newBooking = {
      firstName,
      lastName,
      phoneNumber,
      email,
      pickUpLocation,
      pickUpDate: new Date(pickUpDate),
      pickUpTime: new Date(pickUpTime),
      dropOffLocation,
      dropOffDate: new Date(dropOffDate),
      dropOffTime: new Date(dropOffTime),
      numberOfPassengers,
      paymentStatus: "not paid",
      additionalInfo,
      createdAt: new Date(),
    };

    // Insert the new booking into the database
    const result = await bookings.insertOne(newBooking);

    const { userContent, adminContent } = getEmailContent({
      firstName,
      lastName,
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime
    });

    await sendEmail({ to: "blessedmarcel1@gmail.com", subject: "Booking Confirmation", text: userContent });
    await sendEmail({ to: "blessedmarcel1@gmail.com", subject: "New Booking", text: adminContent });


    // Check if the insertion was successful
    if (result.insertedId) {
      return new Response(
        JSON.stringify({
          message: "Booking successful, please check your email",
          result,
        }),
        { status: 201 },
      );
    } else {
      throw new Error("Booking insertion failed");
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({
        message: "Error saving booking information",
      }),
      { status: 500 },
    );
  }
}
