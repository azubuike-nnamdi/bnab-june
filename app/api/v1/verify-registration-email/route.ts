// app/api/send-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface VerifyEmailOption {
  to: string;
  subject: string;
  text: string;
}

interface ExtendedTransportOptions {
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

export async function verifyRegistrationEmail({ to, subject, text }: VerifyEmailOption) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT ?? "465"),
    secure: true,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  } as ExtendedTransportOptions);

  const mailOptions = {
    from: SMTP_FROM,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text } = await request.json();

    if (!to || !subject || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await verifyRegistrationEmail({ to, subject, text });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}