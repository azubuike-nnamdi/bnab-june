import { options } from "@/app/api/auth/[...nextauth]/options";
import { BuyEventTicket } from "@/types/declaration";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Validate session
  const session = await getServerSession(options);
  if (!session) {
    console.log("No active session");
    return NextResponse.json(
      { message: "Session not active" },
      { status: 401 }
    );
  }

  // Validate environment variables
  const { EVENT_BASE_URL, EVENT_API_KEY } = process.env;
  if (!EVENT_BASE_URL || !EVENT_API_KEY) {
    console.error("Missing environment variables");
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  // Parse query params
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("id");
  if (!eventId) {
    return NextResponse.json(
      { message: "Missing event ID in request query" },
      { status: 400 }
    );
  }

  try {
    // Parse request body
    const body: BuyEventTicket = await req.json();
    const { customer_name, customer_mobile, thirdparty_txid, tickets } = body;

    // Validate request body
    if (!customer_name || !customer_mobile || !thirdparty_txid || !tickets || !Array.isArray(tickets) || tickets.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure each ticket has required fields
    for (const ticket of tickets) {
      if (!ticket.ticket_id || !ticket.quantity) {
        return NextResponse.json(
          { message: "Each ticket must have ticket_id and quantity" },
          { status: 400 }
        );
      }
    }

    // Construct API URL
    const url = `${EVENT_BASE_URL}/apis/partner-api/events/${eventId}/buy_ticket`;

    // Make API request to buy ticket
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: EVENT_API_KEY,
      },
      body: JSON.stringify(body),
    });

    // Check response status
    if (!response.ok) {
      const errorMessage = await response.text(); // Optional: Parse API error response
      console.error(`Failed to buy ticket for event ID ${eventId}:`, errorMessage);
      return NextResponse.json(
        { message: "Failed to buy ticket", error: errorMessage },
        { status: response.status }
      );
    }

    // Handle successful response
    const result = await response.json();
    return NextResponse.json(
      { message: "Ticket(s) bought successfully", data: result },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Handle unexpected errors
    console.error("Error buying tickets:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
