import clientPromise from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const data = await req.json();

    const {
      fullName,
      email,
      phoneNumber,
      subject,
      message,
    } = data;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !subject || !message) {
      return new Response("Missing required fields", { status: 400 });
    }


    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return new Response("Invalid email format", { status: 400 });
    }


    //connect to db
    const client = await clientPromise;
    const db = client.db();
    const contact = db.collection("contact");

    //create contact option
    const newContact = {
      fullName,
      email,
      phoneNumber,
      subject,
      message,
      createdAt: new Date(),
    };

    //insert new contact into db
    await contact.insertOne(newContact);

    return new Response(JSON.stringify({ message: "Thanks for contact us!" }), {
      status: 201,
    });

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}


//GET METHOD FOR ADMIN

export async function GET(req: NextRequest) {

  try {
    //connect to db
    const client = await clientPromise;
    const db = client.db();
    const contact = db.collection("contact");

    //get all contacts
    const contacts = await contact.find().toArray();

    return new Response(JSON.stringify(contacts), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}