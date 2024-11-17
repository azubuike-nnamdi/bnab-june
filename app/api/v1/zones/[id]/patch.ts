import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

// PATCH: Update a zone by `_id`
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await req.json();
    const { range, cost, zone } = data;

    // Validate id
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Zone ID is required" }),
        {
          status: 400,

        }
      );
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid zone ID format" }),
        {
          status: 400,

        }
      );
    }

    // Validate if at least one update field is provided
    if (!range && !cost && !zone) {
      return new Response(
        JSON.stringify({ message: "At least one field to update is required" }),
        {
          status: 400,
        }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const zones = db.collection("zones");

    // Check if zone exists before updating
    const existingZone = await zones.findOne({ _id: new ObjectId(id) });

    if (!existingZone) {
      return new Response(
        JSON.stringify({ message: "Zone not found" }),
        {
          status: 404,
        }
      );
    }

    // Create update object with only provided fields
    const updateFields = {
      ...(range && { range }),
      ...(cost && { cost }),
      ...(zone && { zone }),
      updatedAt: new Date()
    };

    const updatedZone = await zones.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      {
        returnDocument: "after"
      }
    );

    if (!updatedZone || !updatedZone.value) {
      return new Response(
        JSON.stringify({ message: "Failed to update zone" }),
        {
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Zone updated successfully",
        data: updatedZone.value
      }),
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Update zone error:', error);

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: "Error updating zone",
          error: error.message
        }),
        {
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "An unknown error occurred" }),
      {
        status: 500
      }
    );
  }
}