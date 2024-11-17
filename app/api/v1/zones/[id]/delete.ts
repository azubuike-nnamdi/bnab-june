import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

// DELETE: Remove a zone by `_id`
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;


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
