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

export async function sendVerificationEmail(email: string, verificationLink: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT ?? "465"),
    secure: true, // Set to true if your SMTP server requires it
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  } as ExtendedTransportOptions);

  const mailOptions = {
    from: SMTP_FROM,
    to: email,
    subject: "Verify your email address",
    text: `Please click on the following link to verify your email address: ${verificationLink}`,
    html: `
      <h1>Email Verification</h1>
      <p>Thank you for registering. Please click on the link below to verify your email address:</p>
      <p><a href="${verificationLink}" style="color: #1a73e8; text-decoration: none;">Verify your email address</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
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