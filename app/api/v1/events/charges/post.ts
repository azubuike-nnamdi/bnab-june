import { options } from "@/app/api/auth/[...nextauth]/options";
import { TicketRequestBody } from "@/types/declaration";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  const { EVENT_BASE_URL, EVENT_API_KEY } = process.env;

  // Check user session
  // if (!session) {
  //   console.log("No active session");
  //   return NextResponse.json({ message: "Session not active" }, { status: 401 });
  // }

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('id');

  // Validate request body
  let body: TicketRequestBody;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 });
  }

  if (!body.tickets || !Array.isArray(body.tickets) || body.tickets.length === 0) {
    return NextResponse.json({ message: "Invalid or missing 'tickets' array in request body" }, { status: 400 });
  }

  for (const ticket of body.tickets) {
    if (!ticket.ticket_id || typeof ticket.quantity !== 'number' || ticket.quantity < 1) {
      return NextResponse.json({ message: "Each ticket must have a valid 'ticket_id' and 'quantity'" }, { status: 400 });
    }
  }

  try {
    const url = `${EVENT_BASE_URL}/apis/partner-api/events/${eventId}/calculate_charges`;

    // Post charges
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${EVENT_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(eventId
        ? `Failed to buy ticket for event with ID ${eventId}`
        : 'Failed to buy ticket'
      );
    }

    // Return the response
    return NextResponse.json({ message: "Ticket(s) bought successfully" }, { status: 200 });

  } catch (error) {
    console.error('Error buying tickets:', error);
    return NextResponse.json(
      {
        message: "Something went wrong"
      },
      { status: 500 }
    );
  }
}

