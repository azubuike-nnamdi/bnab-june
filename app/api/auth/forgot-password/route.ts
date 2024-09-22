// /app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db"; // MongoDB connection

import crypto from "crypto"; // For generating secure tokens
import { sendResetPasswordEmail } from "@/lib/send-reset-password";

// Define schema for email validation
const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate email input
    const { email } = ForgotPasswordSchema.parse(data);

    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection('users');

    // Check if user exists
    const user = await userCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No account found with that email address" }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = await bcrypt.hash(resetToken, 12);

    // Set token expiration time (e.g., 1 hour)
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Update user with the reset token and its expiration
    await userCollection.updateOne(
      { email },
      {
        $set: {
          resetPasswordToken: hashedResetToken,
          resetPasswordExpires: tokenExpiry,
        },
      }
    );

    // Generate reset password link
    const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${resetToken}`;

    // Send reset password email
    try {
      await sendResetPasswordEmail(email, resetLink);
    } catch (error) {
      console.error("Failed to send reset password email:", error);
      return NextResponse.json(
        { message: "Failed to send reset password email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Password reset link sent successfully. Please check your email." }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
