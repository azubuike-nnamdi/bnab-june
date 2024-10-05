import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { genId } from "@/lib/helper";
import { TicketBookingProps } from "@/types/declaration";
import { ObjectId } from "mongodb"; // Use ObjectId from the mongodb package

// Helper function to validate required fields
const validateRequiredFields = (data: any, fields: string[], messagePrefix = "") => {
  for (const field of fields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      return { message: `${messagePrefix}${field} is required`, isValid: false };
    }
  }
  return { isValid: true };
};

// Function to fetch event by ID
const getEventById = async (db: any, eventId: string) => {
  return await db.collection("all-ticketmaster-event").findOne({ _id: new ObjectId(eventId) });
};

// Function to reduce ticket count
const decrementTicketCount = async (db: any, eventId: string) => {
  return await db.collection("all-ticketmaster-event").updateOne(
    { _id: new ObjectId(eventId) },
    { $inc: { noOfTickets: -1 } }
  );
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return new Response(JSON.stringify({ message: "Session not active" }), {
      status: 401,
    });
  }

  try {
    const data = await req.json();
    const { firstName, lastName, email, phoneNumber, event, isBookingForSelf } = data;

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phoneNumber", "event", "isBookingForSelf"];
    const validation = validateRequiredFields(data, requiredFields);
    if (!validation.isValid) {
      return new Response(JSON.stringify({ message: validation.message }), { status: 400 });
    }

    // Additional validation if not booking for self
    if (!isBookingForSelf) {
      const additionalFields = ["forBookingFirstName", "forBookingLastName", "forBookingEmail", "forBookingPhoneNumber"];
      const additionalValidation = validateRequiredFields(data, additionalFields, "forBooking ");
      if (!additionalValidation.isValid) {
        return new Response(JSON.stringify({ message: additionalValidation.message }), { status: 400 });
      }
    }

    const client = await clientPromise;
    const db = client.db();

    const bookedEvent = await getEventById(db, event._id);

    if (!bookedEvent) {
      return new Response(JSON.stringify({ message: "Event not found" }), { status: 404 });
    }

    if (bookedEvent.noOfTickets <= 0) {
      return new Response(JSON.stringify({ message: "No tickets available for this event" }), { status: 400 });
    }

    // Decrease the number of tickets available
    const updateResult = await decrementTicketCount(db, event._id);

    // Check if the ticket decrement was successful
    if (updateResult.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Failed to update tickets" }), { status: 500 });
    }

    const bookingId = genId();
    const ticketBooking = db.collection("ticket-booking");

    const ticket: TicketBookingProps = {
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
      ...(isBookingForSelf ? {} : {
        forBookingFirstName: data.forBookingFirstName,
        forBookingLastName: data.forBookingLastName,
        forBookingEmail: data.forBookingEmail,
        forBookingPhoneNumber: data.forBookingPhoneNumber,
      }),
    };

    await ticketBooking.insertOne(ticket);

    return new Response(JSON.stringify({ message: "Ticket booking is successful" }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// Simplified GET handler
export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return new Response(JSON.stringify({ message: "Session not active" }), {
      status: 401,
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const ticketBooking = db.collection("ticket-booking");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const tickets = id ? await ticketBooking.findOne({ id }) : await ticketBooking.find().toArray();

    if (id && !tickets) {
      return new Response(JSON.stringify({ message: "Ticket not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
