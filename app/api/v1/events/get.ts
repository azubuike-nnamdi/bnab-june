import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);
  const { EVENT_BASE_URL, EVENT_API_KEY } = process.env

  // Check user session
  // if (!session) {
  //   console.log("No active session");
  //   return NextResponse.json({ message: "Session not active" }, { status: 401 });
  // }

  // Extract the event ID from the URL search params
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('id');

  try {
    // Fetch request to partner events API

    const url = eventId
      ? `${EVENT_BASE_URL}/apis/partner-api/events/${eventId}`
      : `${EVENT_BASE_URL}/apis/partner-api/events`;

    // Fetch request to partner events API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${EVENT_API_KEY}`,
      },
    });

    // Check if the response is successful

    if (!response.ok) {
      throw new Error(eventId
        ? `Failed to fetch event with ID ${eventId}`
        : 'Failed to fetch partner events'
      );
    }

    // Parse the response
    const events = await response.json();

    // Return the events
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching partner events:', error);
    return NextResponse.json(
      {
        message: eventId
          ? `Failed to retrieve event with ID ${eventId}`
          : 'Failed to retrieve partner events'
      },
      { status: 500 }
    );
  }
}