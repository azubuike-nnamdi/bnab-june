import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import clientPromise from '@/lib/db';

// Define schema for password reset
const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input
    const validatedData = ResetPasswordSchema.parse(data);
    const { token, password } = validatedData;

    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection('users');

    // Find the user by the hashed token
    const user = await userCollection.findOne({
      resetPasswordExpires: { $gt: new Date() }, // Token must still be valid (not expired)
    });


    if (!user) {
      return NextResponse.json({ message: 'No user found or token has expired. Please request a new password reset.' }, { status: 404 });
    }
    // Compare provided token with hashed token in the database
    const tokenMatches = await bcrypt.compare(token, user.resetPasswordToken);

    if (!tokenMatches) {
      return NextResponse.json({ message: 'Invalid token, please request a new token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password and remove the token
    await userCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetPasswordToken: "", // Remove the token so it can't be used again
          resetPasswordExpires: "", // Remove token expiry field
        },
      }
    );

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
