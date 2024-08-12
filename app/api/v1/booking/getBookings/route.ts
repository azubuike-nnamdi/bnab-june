import { options } from "@/app/api/auth/[...nextauth]/options";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  //check user session
  const session = await getServerSession(options)
  // if (!session) {
  //   return new Response(JSON.stringify({
  //     message: "Unauthorized"
  //   }), {
  //     status: 401
  //   })
  // }

  //handle request
  try {
    const client = await clientPromise;
    const db = client.db();
    const bookings = db.collection('bookings');

    const dedicatedRides = await bookings.find().toArray();
    return new Response(JSON.stringify(dedicatedRides), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({
      message: "Something went wrong"
    }), {
      status: 500
    })
  }
}