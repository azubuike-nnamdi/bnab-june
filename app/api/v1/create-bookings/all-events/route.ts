import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Parse the incoming request body
    const body = await req.json();

    // Ensure all required fields are provided
    const { title, description, address, date, time, base64Image } = body;

    if (!title || !description || !address || !date || !time || !base64Image) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Insert the event data into the `save-ticketmaster-event` collection
    const result = await db.collection('all-ticketmaster-event').insertOne({
      title,
      description,
      address,
      date,
      time,
      image: base64Image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: 'Event saved successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error saving event:', error);
    return NextResponse.json({ message: 'Error saving event', error }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all events from the `all-ticketmaster-event` collection
    const events = await db.collection('all-ticketmaster-event').find({}).toArray();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
  }
}
