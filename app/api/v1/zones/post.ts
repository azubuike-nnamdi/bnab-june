import clientPromise from "@/lib/db";
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