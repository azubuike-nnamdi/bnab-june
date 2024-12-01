import { useCallback, useEffect, useRef, useState } from 'react'

const YOUR_API_KEY = 'AIzaSyCWyd2E7siWI_KdYmok7esykQFzWUbkGgo'

const Page = () => {
  const locationA = 'Kotoka International Airport - Accra, KA PMB 36 KIA, Accra, Ghana'
  const [locationB, setLocationB] = useState<string>('')
  const [distance, setDistance] = useState<number | null>(null)

  const inputARef = useRef<HTMLInputElement | null>(null)
  const inputBRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places&callback=initMap`
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    loadGoogleMaps()

    window.initMap = () => {
      if (window.google && window.google.maps) {
        const autocompleteB = new window.google.maps.places.Autocomplete(inputBRef.current!)

        autocompleteB.addListener('place_changed', () => {
          const place = autocompleteB.getPlace()
          setLocationB(place.formatted_address)
        })
      }
    }

    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const calculateDistance = useCallback(async () => {
    if (!locationA || !locationB) {
      return
    }

    try {
      const response = await fetch(
        `/api/distance?locationA=${encodeURIComponent(locationA)}&locationB=${encodeURIComponent(locationB)}`
      )
      const data = await response.json()

      if (data.rows && data.rows[0].elements && data.rows[0].elements[0].status === 'OK') {
        setDistance(data.rows[0].elements[0].distance.value / 1000) // distance in kilometers
      } else {
        setDistance(null)
        console.error('Error fetching distance:', data)
      }
    } catch (error) {
      console.error('Failed to fetch distance:', error)
      setDistance(null)
    }
  }, [locationA, locationB])

  useEffect(() => {
    calculateDistance()
  }, [calculateDistance])

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Distance Calculator</h1>
      <div className="mb-4">
        <input
          ref={inputARef}
          type="text"
          placeholder="Kotoka International Airport - Accra, KA PMB 36 KIA, Accra, Ghana"
          disabled
          className="mr-2 cursor-not-allowed rounded border p-2"
          onChange={() => setDistance(null)}
        />
        <input
          ref={inputBRef}
          type="text"
          placeholder="Location B"
          className="rounded border p-2"
          onChange={() => setDistance(null)}
        />
      </div>
      {distance !== null && (
        <p className="mb-4">
          Distance: {distance.toFixed(2)} km <br />
          <em>TODO: check the corresponding fee for the distance and *determine the cost of the booking.</em>
          <br />
          Example 1: less than 5km = the user should be billed $20.00
          <br />
          Example 2: between 5km and 10km = the user should be billed $25.00
          <br />
          Example 3: above 10km = the user should be billed $30.00
        </p>
      )}
      <button
        className={`rounded bg-blue-500 px-4 py-2 text-white ${!distance ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={distance === null}
        onClick={() => {
          alert('... proceed with payment')
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default Page
