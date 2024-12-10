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

  try {
    // Fetch request to partner events API
    const response = await fetch(`${EVENT_BASE_URL}/apis/partner-api/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${EVENT_API_KEY}`,
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch partner events');
    }

    // Parse the response
    const events = await response.json();

    // Return the events
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching partner events:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve partner events' },
      { status: 500 }
    );
  }
}