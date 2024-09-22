import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { ExtendedTransportOptions } from '@/types/declaration';

const { SMTP_PASSWORD, SMTP_HOST, SMTP_USERNAME, SMTP_PORT } = process.env;

if (!SMTP_PASSWORD || !SMTP_HOST || !SMTP_USERNAME || !SMTP_PORT) {
  throw new Error("Missing SMTP credentials");
}
// Generate a random OTP
export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// Send OTP via email
export async function sendOtp(email: string, otp: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    secure: false,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  } as ExtendedTransportOptions);

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'OTP To Complete Your Sign Process',
    text: `Welcome back! Please use the otp code ${otp} to complete your sign in process`,
  };

  await transporter.sendMail(mailOptions);
}