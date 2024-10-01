import { SendEmailOptions } from "@/types/declaration";
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

const { SMTP_PASSWORD, SMTP_HOST, SMTP_USERNAME, SMTP_PORT } = process.env;

if (!SMTP_PASSWORD || !SMTP_HOST || !SMTP_USERNAME || !SMTP_PORT) {
  throw new Error("Missing credentials");
}

export const sendEmail = async ({ to, subject, text }: SendEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10), // Ensure port is parsed as an integer
    secure: true, // You can set this to true if your SMTP server requires it
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  } as ExtendedTransportOptions);

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
