import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationA = searchParams.get('locationA')
  const locationB = searchParams.get('locationB')
  const apiKey = 'AIzaSyCWyd2E7siWI_KdYmok7esykQFzWUbkGgo'

  if (!locationA || !locationB || !apiKey) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(locationA)}&destinations=${encodeURIComponent(locationB)}&key=${apiKey}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching distance:', error)
    return NextResponse.json({ error: 'Failed to fetch distance' }, { status: 500 })
  }
}
