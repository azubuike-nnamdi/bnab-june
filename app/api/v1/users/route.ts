import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  // Ensure the user is authenticated
  // if (!session) {
  //   return new Response(JSON.stringify({ message: "Unauthorized" }), {
  //     status: 401,
  //   });
  // }

  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Fetch all users
    const users = await usersCollection.find({}, {
      projection: {
        fullName: 1,
        email: 1,
        phoneNumber: 1,
        role: 1,
        _id: 1
      }
    }).toArray();

    // Return the users list
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
