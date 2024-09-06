import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { genId } from "@/lib/helper";
import { TicketBookingFormDataProps } from "@/types/declaration";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  // Check user session
  // if (!session) {
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      event,
      isBookingForSelf,
      forBookingFirstName,
      forBookingLastName,
      forBookingEmail,
      forBookingPhoneNumber
    } = data;

    // Validate the fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "event",
      "isBookingForSelf",
    ];

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        return new Response(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }

    // Additional validation for non-self bookings
    if (!isBookingForSelf) {
      const additionalFields = [
        "forBookingFirstName",
        "forBookingLastName",
        "forBookingEmail",
        "forBookingPhoneNumber",
      ];

      for (const field of additionalFields) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
          return new Response(JSON.stringify({ message: `${field} is required when booking for someone else` }), {
            status: 400,
          });
        }
      }
    }

    // Generate unique ID for the booking
    const bookingId = genId();

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const ticketBooking = db.collection("ticket-booking");

    // Create a new ticket object
    const ticket: TicketBookingFormDataProps = {
      id: bookingId,
      firstName,
      lastName,
      email,
      phoneNumber,
      event,
      paymentStatus: "not paid",
      createdAt: new Date(),
      updatedAt: new Date(),
      isBookingForSelf,
    };

    // Include additional fields if booking for someone else
    if (!isBookingForSelf) {
      ticket.forBookingFirstName = forBookingFirstName;
      ticket.forBookingLastName = forBookingLastName;
      ticket.forBookingEmail = forBookingEmail;
      ticket.forBookingPhoneNumber = forBookingPhoneNumber;
    }

    // Insert the new booking into the database
    await ticketBooking.insertOne(ticket);

    return new Response(JSON.stringify({ message: "Ticket booking is successful" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}


export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  // Check user session
  // if (!session) {
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  try {
    const client = await clientPromise;
    const db = client.db();
    const ticketBooking = db.collection("ticket-booking");

    // Retrieve ID from query params if present
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let tickets;

    if (id) {
      // Fetch a specific ticket by ID
      tickets = await ticketBooking.findOne({ id });
      if (!tickets) {
        return new Response(JSON.stringify({ message: "Ticket not found" }), {
          status: 404,
        });
      }
    } else {
      // Fetch all tickets
      tickets = await ticketBooking.find().toArray();
    }

    return new NextResponse(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}