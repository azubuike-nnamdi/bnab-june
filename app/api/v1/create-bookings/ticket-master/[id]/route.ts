import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  // Check user session if needed
  // if (!session) {
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  try {
    const client = await clientPromise;
    const db = client.db();
    const ticketCollection = db.collection("all-ticketmaster-event");

    // Retrieve ID from the request URL directly
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop(); // Extract ID from the route

    // Return an error if no id is provided
    if (!id) {
      return new NextResponse(JSON.stringify({ message: "Ticket ID is required" }), { status: 400 });
    }

    // Convert the ID string to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id); // Attempt to convert the string ID to ObjectId
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Invalid Ticket ID format" }), { status: 400 });
    }

    // Fetch the ticket by _id (ObjectId)
    const ticket = await ticketCollection.findOne({ _id: objectId });

    // Handle case where no ticket is found
    if (!ticket) {
      return new NextResponse(JSON.stringify({ message: "Ticket not found" }), { status: 404 });
    }

    // Return the ticket data if found
    return NextResponse.json({ ticket }, { status: 200 });

  } catch (error) {
    console.error("Error fetching ticket:", error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// DELETE method to remove an event by ID
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(options);

    // Check if the user has a session if needed
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Session not active" }), { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();

    // Extract the ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
    }

    // Delete the event by ID
    const result = await db.collection('all-ticketmaster-event').deleteOne({ _id: new ObjectId(id) });
    console.log(result)

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ message: 'Error deleting event', error: (error as Error).message }, { status: 500 });
  }
}

// PATCH method to update specific fields of an event by ID
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(options);

    // Check if the user has a session if needed
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Session not active" }), { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Extract the ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: 'Ticket ID is required' }, { status: 400 });
    }

    // Parse the body for the fields that need to be updated
    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ message: 'No fields provided for update' }, { status: 400 });
    }

    // Convert the string ID to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid Ticket ID format' }, { status: 400 });
    }

    // Update the ticket fields based on the body input
    const updateResult = await db.collection('all-ticketmaster-event').updateOne(
      { _id: objectId }, // Find the ticket by its ObjectId
      { $set: body }     // Update only the provided fields
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
    }

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: 'No fields were updated' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Ticket updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ message: 'Error updating ticket', error: (error as Error).message }, { status: 500 });
  }
}

