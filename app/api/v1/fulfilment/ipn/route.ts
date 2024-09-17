import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// Implement the validation logic here
const validateIpn = (data: any): boolean => {
  const validatedIpnData = data?.transaction_id;

  return validatedIpnData;
};

// Implement our processing logic here (update order status in our database)
const processIpnData = async (data: any) => {
  // If processed successfully, return true, else log failure and return false
  const isProcessedSuccessfully: boolean = true
  console.log('Processing IPN:', data);

  return isProcessedSuccessfully
};

export async function POST(req: NextRequest) {
  // Check user session
  const session = await getServerSession(options);

  // if user is not logged in, return unauthorized response
  // if (!session) {
  //   return new NextResponse(JSON.stringify({ message: "Session not active" }), {
  //     status: 401,
  //   });
  // }


  try {
    const ipnData = await req.json(); // Parse the incoming JSON data
    console.log('pin', ipnData)

    // Validate the IPN data (this will depend on your payment provider)
    const isValid = validateIpn(ipnData);

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid IPN' }, { status: 400 });
    }

    // Process the valid IPN data,
    await processIpnData(ipnData);

    // Respond with 200 OK
    return NextResponse.json({ message: 'IPN received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing IPN:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}