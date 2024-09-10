import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const HOSTNAME = process.env.PAYSTACK_HOSTNAME

export async function POST(req: NextRequest) {

  // Ensure environment variables are set
  if (!PAYSTACK_SECRET_KEY || !HOSTNAME) {
    return NextResponse.json({ message: 'Server configuration error: Missing Paystack credentials.' }, { status: 500 });
  }
  // Ensure the request is a POST method
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { email, amount, reference, currency } = await req.json();

  // Check if email and amount are provided
  if (!email || !amount || !reference) {
    return NextResponse.json({ message: 'Email and amount are required' }, { status: 400 });
  }

  const params = JSON.stringify({
    reference,
    email,
    amount,
    // currency
  });

  const options = {
    hostname: `${HOSTNAME}`,
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const paystackReq = https.request(options, (paystackRes) => {
      let data = '';

      // Listen for data chunks
      paystackRes.on('data', (chunk) => {
        data += chunk;
      });

      // When response ends, parse and return the result
      paystackRes.on('end', () => {
        try {
          const responseData = JSON.parse(data);

          if (paystackRes.statusCode === 200) {
            resolve(NextResponse.json(responseData, { status: 200 }));
          } else {
            resolve(
              NextResponse.json(
                { message: responseData.message || 'An error occurred while processing your request.' },
                { status: paystackRes.statusCode || 500 }
              )
            );
          }
        } catch (error) {
          resolve(NextResponse.json({ message: 'Error parsing Paystack response' }, { status: 500 }));
        }
      });
    });

    // Handle request errors
    paystackReq.on('error', (error) => {
      resolve(NextResponse.json({ message: `Paystack request failed: ${error.message}` }, { status: 500 }));
    });

    // Write the request parameters and end the request
    paystackReq.write(params);
    paystackReq.end();
  });
}
