import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/db';
import { ObjectId } from "mongodb";
import nodemailer from 'nodemailer'; // Use ObjectId from the mongodb package
import { BuyEventTicket } from '@/types/declaration';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';


const { PAYSTACK_HOSTNAME, PAYSTACK_SECRET_KEY, EVENT_BASE_URL, EVENT_API_KEY, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM } = process.env;

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('reference'); // Rename reference to transactionId
    console.log('Transaction ID:', transactionId);

    if (!transactionId) {
      return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 });
    }

    const response = await axios.get(
      `https://${PAYSTACK_HOSTNAME}/transaction/verify/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const paystackTransaction = response.data.data;

    // Connect to database
    const client = await clientPromise;
    const db = client.db();

    // Log the response from Paystack to the 'verify-transaction-log' collection
    await db.collection('verify-transaction-log').insertOne(paystackTransaction);

    // Fetch the transaction from the 'payment-history' collection
    const transaction = await db.collection('payment-history').findOne({ transactionId }); // Use transactionId
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 422 });
    }

    // Check if the transactionId matches and the amount (budget) in the database matches the Paystack response
    const isReferenceMatching = transaction.transactionId === paystackTransaction.reference; // Compare with transactionId
    const isAmountMatching = transaction.budget === paystackTransaction.amount;

    if (!isReferenceMatching || !isAmountMatching) {
      return NextResponse.json({
        message: 'We are unable to confirm your transaction, please contact the administrator for support!'
      }, { status: 400 });
    }

    // If reference and amount match, update the transaction status depending on the status from Paystack and set count to 1
    await db.collection('payment-history').updateOne(
      { transactionId: paystackTransaction.reference }, // Use transactionId
      {
        $set: {
          transaction_status: paystackTransaction.status, // Dynamically update the status from Paystack
          count: 1 // Set count to 1
        }
      }
    );

    // If the booking type is ticket-master, decrease the noOfTickets in the all-ticketmaster-event collection
    if (transaction.bookingType === 'ticket-master' && transaction.event) {
      console.log('Attempting to update ticket count for event:', transaction.event);

      // const eventId = transaction.event._id;
      // const updateResult = await db.collection('all-ticketmaster-event').updateOne(
      //   { _id: new ObjectId(eventId) },
      //   { $inc: { noOfTickets: - 1 } }
      // );

      // if (updateResult.modifiedCount === 0) {
      //   console.warn(`Failed to update ticket count for event ${eventId}`);
      // }
      const body: BuyEventTicket = {
        customer_name: `${transaction.firstName} ${transaction.lastName}`,
        customer_mobile: transaction.phoneNumber,
        thirdparty_txid: transactionId,
        tickets: [
          {
            ticket_id: transaction.ticketType,
            quantity: transaction.quantity, // e.g., 1
          },
        ],
      };

      // Event ticket purchase API URL
      // Event ticket purchase API URL
      const url = `${EVENT_BASE_URL}/apis/partner-api/events/${transaction.event.id}/buy_ticket`;

      const ticketResponse = await fetch(url, {
        method: "POST",
        headers: { // Corrected placement of headers
          "Content-Type": "application/json",
          Authorization: String(EVENT_API_KEY),
        },
        body: JSON.stringify(body),
      });
      if (ticketResponse.ok) {
        const ticketResponseData = await ticketResponse.json();

        // Send email with ticket details
        await emailTicketDetails(body, ticketResponseData);
      } else {
        console.error('Failed to buy ticket:', await ticketResponse.text());
      }
    }

    // // Consume the "buy event ticket" API
    // if (transaction.bookingType === "ticket-master") {
    //   const body: BuyEventTicket = {
    //     customer_name: transaction.firstName + transaction.lastName,
    //     customer_mobile: transaction.phoneNumber,
    //     thirdparty_txid: transactionId,
    //     tickets: transaction.tickets,
    //   };

    return NextResponse.json({
      message: "Transaction verified",
      paystackTransaction
    }, { status: 200 });



  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        message: "An error occurred while verifying the transaction",
        error: error.response?.data || error.message
      }, { status: error.response?.status ?? 500 });
    }
    return NextResponse.json({
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}



async function emailTicketDetails(buyTicketData: BuyEventTicket, ticketResponseData: any) {
  const session = await getServerSession(options);

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT ?? "465"),
      secure: true, // Set to true if your SMTP server requires it
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    });

    const ticketUrl = ticketResponseData.tickets[0]?.ticket_url || '';
    const eventName = ticketResponseData.event_name || 'Your Event';

    const mailOptions = {
      from: SMTP_FROM,
      to: session?.user?.email as string,
      subject: `Your Ticket for ${eventName}`,
      html: `
        <h3>Hello ${buyTicketData.customer_name},</h3>
        <p>Thank you for purchasing a ticket for <strong>${eventName}</strong>.</p>
        <p><strong>Event Details:</strong></p>
        <ul>
          <li><strong>Venue:</strong> ${ticketResponseData.tickets[0]?.venue_name || 'Venue'}</li>
          <li><strong>Ticket Name:</strong> ${ticketResponseData.tickets[0]?.ticket_name || 'General Admission'}</li>
          <li><strong>Quantity:</strong> ${buyTicketData.tickets[0]?.quantity || 1}</li>
          <li><strong>Total Amount:</strong> $${ticketResponseData.total_amount}</li>
        </ul>
        <p>You can download your ticket using the link below:</p>
        <a href="${ticketUrl}" target="_blank">Download Ticket</a>
        <br/><br/>
        <p>Thank you for choosing our service!</p>
        <p>Best regards,<br/>Event Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', session?.user?.email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}