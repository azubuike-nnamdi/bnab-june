import clientPromise from "@/lib/db";
import { NextRequest } from "next/server";

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