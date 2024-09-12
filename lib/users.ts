import clientPromise from "@/lib/db";

export async function getAllUsers() {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Fetch all users from the collection
    const users = await usersCollection.find({}).toArray();

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Unable to fetch users");
  }
}
