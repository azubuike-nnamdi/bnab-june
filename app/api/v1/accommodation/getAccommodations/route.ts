//GET METHOD

import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options)

  // Check user session
  // if (!session) {
  //   console.log("No active session");
  //   return new Response(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }

  try {
    const client = await clientPromise;
    const db = client.db();
    const accommodation = db.collection("accommodation");

    const accommodationBookings = await accommodation.find().toArray();
    return new Response(JSON.stringify(accommodationBookings), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}