import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchKeyword = request.nextUrl.searchParams.get('search') || '';

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input: searchKeyword,
        types: 'address',
        components: 'country:gh',
        location: '7.950576277069621, -1.3653371567836274', // Ghana coordinates
        // radius: 3300, // Radius in meters
        key: process.env.GOOGLE_MAP_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
