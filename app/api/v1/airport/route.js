import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(options);

  // Check user session
  if (!session) {
    console.log("No active session");
    return new Response(JSON.stringify({ message: "Session not active" }), {
      status: 401,
    });
  }

  // Handle POST request
  try {
    const data = await req.json();

    const {
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      pickUpTime,
      numberOfPassengers
    } = data;

    //check fields
    const requiredFields = [
      "pickUpLocation",
      "dropOffLocation",
      "pickUpDate",
      "pickUpTime",
      "numberOfPassengers",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }

    const client = await clientPromise;
    const db = client.db();
    const airportPickup = db.collection("airportPickup");

    const aiportBooking = {
      userId: session.user._id,
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      pickUpTime,
      numberOfPassengers,
      createAt: new Date(),
      updatedAt: new Date(),
    };

    //insert new booking into db
    const result = await airportPickup.insertOne(aiportBooking);

    if (result.insertedId) {
      return new Response(JSON.stringify({ message: "Airport Booking successful" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Airport Booking failed" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}