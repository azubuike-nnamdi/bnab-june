import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const HOSTNAME = process.env.PAYSTACK_HOSTNAME;

export async function POST(req: NextRequest): Promise<NextResponse> {

  // Ensure environment variables are set
  if (!PAYSTACK_SECRET_KEY || !HOSTNAME) {
    return NextResponse.json({ message: 'Server configuration error: Missing Paystack credentials.' }, { status: 500 });
  }

  const { email, amount, reference, currency } = await req.json();

  // Check if email and amount are provided
  if (!email || !amount || !reference) {
    return NextResponse.json({ message: 'Email, amount, and reference are required' }, { status: 400 });
  }

  const params = JSON.stringify({
    reference,
    email,
    amount,
    currency, // Uncomment if you want to include currency
  });

  const options = {
    hostname: HOSTNAME,
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const paystackResponse = await new Promise<{ statusCode: number; body: string }>((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({ statusCode: res.statusCode || 500, body: data });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(params);
      req.end();
    });

    const responseData = JSON.parse(paystackResponse.body);

    if (paystackResponse.statusCode === 200) {
      return NextResponse.json(responseData, { status: 200 });
    } else {
      return NextResponse.json(
        { message: responseData.message || 'An error occurred while processing your request.' },
        { status: paystackResponse.statusCode }
      );
    }

  } catch (error) {
    return NextResponse.json({ message: `Paystack request failed: ${(error as Error).message}` }, { status: 500 });
  }
}
