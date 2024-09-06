import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getEmailContent } from "@/lib/emailContent";
import { sendEmail } from "@/lib/sendEmail";
import { DedicatedRideBookingProps } from "@/types/declaration";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  // Check user session
  if (!session) {
    console.log("No active session");
    return new Response(JSON.stringify({ message: "Session not active" }), {
      status: 401,
    });
  }

  try {
    // Parse booking data from the request body
    const body: DedicatedRideBookingProps = await req.json();

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
      isBookingForSelf,
      numberOfPassengers,
      additionalInfo,
      bookingForName,
      bookingForPhone,
    } = body;

    // Define a type guard function for checking required fields
    const isDefined = (value: any): boolean => value !== undefined && value !== null && value !== '';

    // Validate required fields
    const requiredFields: Array<keyof DedicatedRideBookingProps> = [
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
      "isBookingForSelf",
      "numberOfPassengers",
      "additionalInfo",
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
      if (!isDefined(bookingForName) || !isDefined(bookingForPhone)) {
        return new Response(
          JSON.stringify({ message: "Missing required fields for booking for someone else" }),
          { status: 401 }
        );
      }
    }

    // Ensure date fields are valid and convert to string format if required
    const formatDate = (date?: Date): string | undefined => date ? date.toISOString() : undefined;

    const pickUpDateStr = pickUpDate ? formatDate(new Date(pickUpDate)) : undefined;
    const pickUpTimeStr = pickUpTime ? formatDate(new Date(pickUpTime)) : undefined;
    const dropOffDateStr = dropOffDate ? formatDate(new Date(dropOffDate)) : undefined;
    const dropOffTimeStr = dropOffTime ? formatDate(new Date(dropOffTime)) : undefined;

    if (!pickUpDateStr || !pickUpTimeStr || !dropOffDateStr || !dropOffTimeStr) {
      return new Response(
        JSON.stringify({ message: "Invalid date/time format" }),
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const bookings = db.collection("bookings");

    // Create a new booking object
    const newBooking: DedicatedRideBookingProps & { createdAt: string } = {
      firstName,
      lastName,
      phoneNumber,
      email,
      isBookingForSelf,
      pickUpLocation,
      pickUpDate: pickUpDateStr,
      pickUpTime: pickUpTimeStr,
      dropOffLocation,
      dropOffDate: dropOffDateStr,
      dropOffTime: dropOffTimeStr,
      numberOfPassengers,
      paymentStatus: "not paid",
      additionalInfo,
      createdAt: new Date().toISOString(),
    };

    // Include bookingForName and bookingForPhone if not booking for self
    if (!isBookingForSelf) {
      newBooking.bookingForName = bookingForName!;
      newBooking.bookingForPhone = bookingForPhone!;
    }

    // Insert the new booking into the database
    const result = await bookings.insertOne(newBooking);

    // Pass the full booking data including all required fields to getEmailContent
    const { userContent, adminContent } = getEmailContent({
      firstName,
      lastName,
      phoneNumber,
      email,
      pickUpLocation,
      pickUpDate: pickUpDateStr,
      pickUpTime: pickUpTimeStr,
      dropOffLocation,
      dropOffDate: dropOffDateStr,
      dropOffTime: dropOffTimeStr,
      isBookingForSelf,
      numberOfPassengers,
      additionalInfo,
      bookingForName,
      bookingForPhone
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
