import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Invalid or missing token' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection('users');

    // Find user whose token is valid and not expired
    const user = await userCollection.findOne({
      verificationTokenExpires: { $gt: new Date() },  // Token hasn't expired
    });

    // Check if a user is found with a non-expired token
    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Now compare the provided token (from query) with the hashed token in the DB
    const isTokenValid = await bcrypt.compare(token, user.verificationToken);


    if (!isTokenValid) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    // Update the user's emailVerified status and clear token-related fields
    const updateResult = await userCollection.updateOne(
      { _id: new ObjectId(user._id) },  // Use ObjectId for querying
      {
        $set: {
          emailVerified: true,            // Set emailVerified to true
          emailVerifiedAt: new Date(),    // Store the date of email verification
        },
        $unset: {
          verificationToken: "",          // Remove the verification token
          verificationTokenExpires: ""    // Remove token expiry field
        }
      }
    );

    // Check if the update was successful
    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: 'Failed to verify email or no changes made' }, { status: 500 });
    }

    // Redirect to a success page after successful verification
    return NextResponse.redirect(`${process.env.APP_URL}/auth/verify-email`);
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ message: 'An error occurred while verifying the email' }, { status: 500 });
  }
}
