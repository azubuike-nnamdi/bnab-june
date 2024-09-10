import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getEmailContent } from "@/lib/emailContent";
import { sendEmail } from "@/lib/sendEmail";
import { DedicatedRidesBooking } from "@/types/declaration";
import { formatDate, formatTime } from "@/lib/helper";

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
    const body: DedicatedRidesBooking = await req.json();

    const {
      transactionId,
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
      isBookingForSelf,
      numberOfPassengers,
      additionalInfo,
      bookingForFirstName,
      bookingForLastName,
      bookingForEmail,
      bookingForPhoneNumber,
      vehicleType,
      price,
      numberOfDays,
      budget,
      bookingType,
      totalAmount
    } = body;

    // Define a type guard function for checking required fields
    const isDefined = (value: any): boolean => value !== undefined && value !== null && value !== '';

    // Validate required fields
    const requiredFields: Array<keyof DedicatedRidesBooking> = [
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
      "vehicleType",
      "price",
      "isBookingForSelf",
      "numberOfPassengers",
      "numberOfDays",
    ];

    for (const field of requiredFields) {
      if (!isDefined(body[field])) {
        return new Response(JSON.stringify({ message: `Missing required field: ${field}` }), {
          status: 401,
        });
      }
    }

    // Additional validation for bookingForName and bookingForPhone
    if (!isBookingForSelf) {
      if (!isDefined(bookingForFirstName) || !isDefined(bookingForLastName) ||
        !isDefined(bookingForEmail) || !isDefined(bookingForPhoneNumber)) {
        return new Response(
          JSON.stringify({ message: "Missing required fields for booking for someone else" }),
          { status: 401 }
        );
      }
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const bookings = db.collection("bookings");


    // Create a new booking object
    const newBooking: DedicatedRidesBooking = {
      transactionId,
      firstName,
      lastName,
      phoneNumber,
      email,
      isBookingForSelf,
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime,
      vehicleType,
      price,
      numberOfPassengers,
      numberOfDays,
      totalAmount,
      paymentStatus: "not paid",
      additionalInfo,
      budget,
      bookingType,
      createdAt: new Date().toISOString(),
    };

    // Include bookingForName and bookingForPhone if not booking for self
    if (!isBookingForSelf) {
      newBooking.bookingForFirstName = bookingForFirstName;
      newBooking.bookingForLastName = bookingForLastName;
      newBooking.bookingForEmail = bookingForEmail;
      newBooking.bookingForPhoneNumber = bookingForPhoneNumber;
    }

    // Insert the new booking into the database
    const result = await bookings.insertOne(newBooking);

    // Pass the full booking data including all required fields to getEmailContent
    const { userContent, adminContent } = getEmailContent({
      firstName,
      lastName,
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime,
      totalAmount
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
