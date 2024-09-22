// /lib/send-reset-password-email.ts

import nodemailer, { TransportOptions } from "nodemailer";

interface ExtendedTransportOptions extends TransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const { SMTP_PASSWORD, SMTP_HOST, SMTP_USERNAME, SMTP_PORT, SMTP_FROM } = process.env;

if (!SMTP_PASSWORD || !SMTP_HOST || !SMTP_USERNAME || !SMTP_PORT || !SMTP_FROM) {
  throw new Error("Missing SMTP credentials");
}

export async function sendResetPasswordEmail(email: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT ?? '0', 10),
    secure: false, // Set to true if your SMTP server requires it
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  } as ExtendedTransportOptions);

  const mailOptions = {
    from: `"Support" ${SMTP_FROM}`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}"  style="color: #1a73e8; text-decoration: none;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

