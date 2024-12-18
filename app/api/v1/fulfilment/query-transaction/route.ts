import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/db';
import { ObjectId } from "mongodb";
import nodemailer from 'nodemailer';
import { BuyEventTicket } from '@/types/declaration';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const { PAYSTACK_HOSTNAME, PAYSTACK_SECRET_KEY, EVENT_BASE_URL, EVENT_API_KEY, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM } = process.env;

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('reference');
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
    const transaction = await db.collection('payment-history').findOne({ transactionId });
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 422 });
    }

    // Validate transaction reference and amount
    const isReferenceMatching = transaction.transactionId === paystackTransaction.reference;
    const isAmountMatching = transaction.budget === paystackTransaction.amount;

    if (!isReferenceMatching || !isAmountMatching) {
      return NextResponse.json({
        message: 'We are unable to confirm your transaction, please contact the administrator for support!'
      }, { status: 400 });
    }

    // Update transaction status in the database
    await db.collection('payment-history').updateOne(
      { transactionId: paystackTransaction.reference },
      {
        $set: {
          transaction_status: paystackTransaction.status,
          count: 1,
        },
      }
    );

    // Proceed with ticket purchase only if bookingType is 'ticket-master' and the payment is successful
    if (transaction.bookingType === 'ticket-master' && paystackTransaction.status === 'success') {
      console.log('Attempting to purchase ticket for event:', transaction.event);

      const body: BuyEventTicket = {
        customer_name: `${transaction.firstName} ${transaction.lastName}`,
        customer_mobile: transaction.phoneNumber,
        thirdparty_txid: transactionId,
        tickets: [
          {
            ticket_id: transaction.ticketType,
            quantity: transaction.quantity,
          },
        ],
      };

      const url = `${EVENT_BASE_URL}/apis/partner-api/events/${transaction.event.id}/buy_ticket`;
      // Log the request body
      await db.collection('ticket-logs').insertOne({
        type: 'request',
        transactionId: transactionId,
        eventId: transaction.event.id,
        body: body,
        url: url,
        createdAt: new Date()
      });
      const ticketResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: String(EVENT_API_KEY),
        },
        body: JSON.stringify(body),
      });

      await db.collection('ticket-response').insertOne(ticketResponse)
      await db.collection('ticket-logs').insertOne({
        type: 'response',
        transactionId: transactionId,
        eventId: transaction.event.id,
        status: ticketResponse.status,
        statusText: ticketResponse.statusText,
        body: ticketResponse,
        createdAt: new Date()
      });

      if (ticketResponse.ok) {
        const ticketResponseData = await ticketResponse.json();

        // Log successful ticket purchase
        await db.collection('buy-event').insertOne({
          transactionId: transactionId,
          eventId: transaction.event.id,
          customerName: `${transaction.firstName} ${transaction.lastName}`,
          ticketType: transaction.ticketType,
          quantity: transaction.quantity,
          responseData: ticketResponseData,
          status: 'success',
          createdAt: new Date()
        });

        await emailTicketDetails(body, ticketResponseData);
      } else {
        // Log failed ticket purchase
        const errorResponseText = await ticketResponse.text();
        console.error('Failed to buy ticket:', errorResponseText);

        await db.collection('logs').insertOne({
          transactionId: transactionId,
          eventId: transaction.event.id,
          customerName: `${transaction.firstName} ${transaction.lastName}`,
          ticketType: transaction.ticketType,
          quantity: transaction.quantity,
          responseData: errorResponseText,
          status: 'failure',
          createdAt: new Date()
        });
      }
    }

    return NextResponse.json({
      message: 'Transaction verified',
      paystackTransaction,
    }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        message: 'An error occurred while verifying the transaction',
        error: error.response?.data || error.message,
      }, { status: error.response?.status ?? 500 });
    }
    return NextResponse.json({
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

async function emailTicketDetails(buyTicketData: BuyEventTicket, ticketResponseData: any) {
  const session = await getServerSession(options);

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT ?? '465'),
      secure: true,
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