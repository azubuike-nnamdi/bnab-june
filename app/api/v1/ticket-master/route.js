import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import clientPromise from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(options)

  //check user session
  if (!session) {
    return new Response(JSON.stringify({ message: "Session not active" }), {
      status: 401,
    });
  }

  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
    } = data;

    //validate the fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(JSON.stringify({ message: `${field} is required` }), {
          status: 400,
        });
      }
    }

    //connect to db
    const client = await clientPromise;
    const db = client.db();
    const ticketBooking = db.collection("ticket-booking");

    //check if the user already exists
    const existingTicket = await ticketBooking.findOne({ email });
    if (existingTicket) {
      return new Response(JSON.stringify({ message: "Ticket already exists" }), {
        status: 409,
      });
    }



    //create a new ticket object
    const ticket = {
      userId: session.user._id,
      firstName,
      lastName,
      email,
      phoneNumber,
      createdAt: new Date(),
    };

    //insert the new user into the db
    await ticketBooking.insertOne(ticket);

    return new Response(JSON.stringify({ message: "Ticket created successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}