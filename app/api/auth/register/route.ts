import clientPromise from '@/lib/db';
import { generateVerificationToken } from '@/lib/helper';
import { sendVerificationEmail } from '@/lib/send-verification-email';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // For input validation

// Define a schema for input validation
const RegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input
    const validatedData = RegisterSchema.parse(data);
    const { fullName, email, phoneNumber, password } = validatedData;

    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection('users');
    const accountCollection = db.collection('accounts');

    // Check for existing user by email
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists, please login to continue" }, { status: 409 });
    }

    // Check if the email is associated with another provider
    const existingAccount = await accountCollection.findOne({ email });
    if (existingAccount) {
      const provider = existingAccount.provider; // Assuming the `provider` field exists
      return NextResponse.json({
        message: `Email is associated with ${provider}. Please sign in with ${provider}.`,
        provider
      }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12); // Increased rounds for better security

    // Generate verification token
    const verificationToken = generateVerificationToken();


    // Hash the token to store it securely in the DB
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 12);

    // Prepare user payload
    const userPayload = {
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'client',
      createdAt: new Date(),
      emailVerified: null,  // Email not verified yet
      verificationToken: hashedVerificationToken,  // Store the hashed token
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 24 hours
    };

    // Insert the new user into the db
    const result = await userCollection.insertOne(userPayload);

    // Generate verification link
    const verificationLink = `${process.env.APP_URL}/api/auth/verify-email?token=${verificationToken}`;


    // Send verification email
    try {
      await sendVerificationEmail(email, verificationLink);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // You might want to delete the user if email sending fails
      await userCollection.deleteOne({ _id: result.insertedId });
      return NextResponse.json({ message: "Failed to send verification email. Please try again later." }, { status: 500 });
    }


    // Prepare the response (excluding sensitive information)
    const user = {
      id: result.insertedId.toString(),
      fullName,
      email,
      phoneNumber,
      role: 'client',
    };

    return NextResponse.json({ message: 'User registered successfully.Please check your email to verify your account.', user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
