// app/api/send-email/route.ts
import { getRequiredEnvVar } from '@/lib/helper';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Get environment variables
const SMTP_PASSWORD = getRequiredEnvVar('SMTP_PASSWORD');
const SMTP_HOST = getRequiredEnvVar('SMTP_HOST');
const SMTP_USERNAME = getRequiredEnvVar('SMTP_USERNAME');
const SMTP_PORT = parseInt(getRequiredEnvVar('SMTP_PORT'), 10);
const SMTP_FROM = getRequiredEnvVar('SMTP_FROM');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email, status, amount, currency, paid_at, channel, reference } = await request.json();

    // Format amount to currency
    const formattedAmount = (amount / 100).toFixed(2);

    // Format the reference to show first 4 and last 4 digits
    const formattedReference = reference
      ? `${reference.substring(0, 4)}-${reference.slice(-4)}`
      : "N/A";

    let subject = '';
    let statusMessage = '';

    switch (status) {
      case 'success':
        subject = 'Transaction Successful';
        statusMessage = 'Your transaction was successful!';
        break;
      case 'failure':
        subject = 'Transaction Failed';
        statusMessage = 'Unfortunately, your transaction has failed.';
        break;
      case 'pending':
        subject = 'Transaction Pending';
        statusMessage = 'Your transaction is currently being processed.';
        break;
      default:
        subject = 'Transaction Update';
        statusMessage = 'There has been an update to your transaction.';
    }

    const emailBody = `
      <h1>${subject}</h1>
      <p>${statusMessage}</p>
      <p>Here are the details of your transaction:</p>
      <ul>
        <li>Amount: ${currency} ${formattedAmount}</li>
        <li>Reference: ${formattedReference}</li>
        <li>Date: ${new Date(paid_at).toLocaleString()}</li>
        <li>Payment Method: ${channel}</li>
      </ul>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
    `;

    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: subject,
      html: emailBody,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}