import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Parse the incoming request body
    const body = await req.json();

    // Ensure all required fields are provided
    const { title, description, address, date, time, phoneNumber, price, noOfTickets, base64Image } = body;

    if (!title || !description || !address || !date || !time || !phoneNumber || !price || !noOfTickets || !base64Image) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Insert the event data into the `save-ticketmaster-event` collection
    const result = await db.collection('all-ticketmaster-event').insertOne({
      title,
      description,
      address,
      date,
      time,
      phoneNumber,
      price,
      noOfTickets,
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

// DELETE method to remove an event by ID
export async function DELETE(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Parse the incoming request body
    const body = await req.json();

    // Ensure all required fields are provided
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
    }

    // Delete the event by ID
    const result = await db.collection('all-ticketmaster-event').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ message: 'Error deleting event', error }, { status: 500 });
  }
}
