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
