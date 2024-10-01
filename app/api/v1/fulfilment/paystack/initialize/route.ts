import { NextRequest, NextResponse } from 'next/server';

const { PAYSTACK_SECRET_KEY, PAYSTACK_HOSTNAME } = process.env

const PAYSTACK_API_URL = `https://${PAYSTACK_HOSTNAME}/transaction/initialize`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Ensure environment variables are set
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ message: 'Missing credentials.' }, { status: 500 });
  }

  const { email, amount, reference, currency } = await req.json();

  // Check if required fields are provided
  if (!email || !amount || !reference) {
    return NextResponse.json({ message: 'Email, amount, and reference are required' }, { status: 400 });
  }

  const convertedAmount = amount * 100;

  const params = {
    reference,
    email,
    amount: convertedAmount,
    currency,
  };

  try {
    const response = await fetch(PAYSTACK_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const responseData = await response.json();

    if (response.ok) {
      return NextResponse.json(responseData, { status: 200 });
    } else {
      return NextResponse.json(
        { message: responseData.message || 'An error occurred while processing your request.' },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: `Paystack request failed: ${(error as Error).message}` }, { status: 500 });
  }
}