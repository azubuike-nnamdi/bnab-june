import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  // Check user session
  if (!session) {
    console.log("No active session");
    return NextResponse.json({ message: "Session not active" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const accommodation = db.collection("accommodation");

    const accommodationBookings = await accommodation.find().toArray();
    return NextResponse.json(accommodationBookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching accommodation bookings:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

