import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";


// POST: Create a new zone
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { range, cost, zone } = data;

    if (!range || !cost || !zone) {
      return new Response("Missing required fields", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const zones = db.collection("zones");

    const newZone = {
      range,
      cost,
      zone,
      createdAt: new Date(),
    };

    await zones.insertOne(newZone);

    return new Response(JSON.stringify({ message: "Zone created successfully!" }), {
      status: 201,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

// GET: Retrieve all zones
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const zones = db.collection("zones");

    const allZones = await zones.find().toArray();

    return new Response(JSON.stringify(allZones), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

// PATCH: Update a zone by `_id`
// PATCH: Update a zone by `_id`
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, range, cost, zone } = data;

    if (!id) {
      return new Response("Zone ID is required", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const zones = db.collection("zones");

    const updatedZone = await zones.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...(range && { range }), ...(cost && { cost }), ...(zone && { zone }) } },
      { returnDocument: "after" }
    );

    if (!updatedZone || !updatedZone.value) {
      return new Response("Zone not found", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Zone updated successfully", data: updatedZone.value }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}


// DELETE: Remove a zone by `_id`
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return new Response("Zone ID is required", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const zones = db.collection("zones");

    const deletedZone = await zones.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedZone || !deletedZone.value) {
      return new Response("Zone not found", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Zone deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
