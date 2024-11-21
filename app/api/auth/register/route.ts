import clientPromise from '@/lib/db';
import { generateVerificationToken } from '@/lib/helper';
import { sendVerificationEmail } from '@/lib/send-verification-email';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const RegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const validatedData = RegisterSchema.parse(data);
    const { fullName, email, phoneNumber, password } = validatedData;

    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection('users');
    const accountCollection = db.collection('accounts');

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists, please login to continue" }, { status: 409 });
    }

    const existingAccount = await accountCollection.findOne({ email });
    if (existingAccount) {
      const provider = existingAccount.provider;
      return NextResponse.json({
        message: `Email is associated with ${provider}. Please sign in with ${provider}.`,
        provider
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationToken();
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 12);

    const userPayload = {
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'client',
      createdAt: new Date(),
      emailVerified: null,
      verificationToken: hashedVerificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    const result = await userCollection.insertOne(userPayload);

    const verificationLink = `${process.env.APP_URL}/api/auth/verify-email?token=${verificationToken}`;

    try {
      await sendVerificationEmail(email, verificationLink);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      await userCollection.deleteOne({ _id: result.insertedId });
      return NextResponse.json({ message: "Failed to send verification email. Please try again later." }, { status: 500 });
    }

    const user = {
      id: result.insertedId.toString(),
      fullName,
      email,
      phoneNumber,
      role: 'client',
    };

    return NextResponse.json({ message: 'User registered successfully. Please check your email to verify your account.', user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

