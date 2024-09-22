import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { v4 as uuidv4 } from 'uuid'; // For generating a new session token

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { otp } = data;

    if (!otp) {
      return new NextResponse(JSON.stringify({ message: "OTP is required" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const otpCollection = db.collection('otp_store');
    const sessionCollection = db.collection('sessions');
    const userCollection = db.collection('users');

    // Retrieve session from cookies
    const cookies = req.headers.get('cookie');
    const sessionToken = cookies?.split('; ').find(row => row.startsWith('HyeaMeHa_sessionToken='))?.split('=')[1];

    if (!sessionToken) {
      return new NextResponse(JSON.stringify({ message: "Session token is missing" }), {
        status: 401,
      });
    }

    // Find the session in the database
    const session = await sessionCollection.findOne({ sessionToken });

    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Invalid session token" }), {
        status: 401,
      });
    }

    // Retrieve user's email or other identifier from user collection
    const user = await userCollection.findOne({ _id: session.userId });
    const userEmail = user?.email;

    // Use the email to find the OTP record
    const otpRecord = await otpCollection.findOne({ email: userEmail });

    if (!otpRecord || otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
      return new NextResponse(JSON.stringify({ message: "Invalid or expired OTP" }), {
        status: 400,
      });
    }

    // OTP is valid, clean up OTP record
    await otpCollection.deleteOne({ email: userEmail });

    // Update the user's lastActive field in the user collection
    await userCollection.updateOne(
      { _id: session.userId },
      { $set: { lastActive: new Date() } }
    );

    // Generate a new session token and set it in the database
    const newSessionToken = uuidv4();
    await sessionCollection.updateOne(
      { sessionToken },
      { $set: { sessionToken: newSessionToken } }
    );
    console.log('Session Token:', sessionToken);
    console.log('OTP Record:', otpRecord);
    console.log('User Email:', userEmail);
    // Set session token in cookies
    const response = new NextResponse(JSON.stringify({ message: "Sign-in successful" }), { status: 200 });
    response.cookies.set("HyeaMeHa_sessionToken", newSessionToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}