import { corsHeaders } from '../_shared/cors.ts';

interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  class?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { origin, destination, departureDate, returnDate, adults, children = 0, infants = 0, class: travelClass = 'ECONOMY' }: FlightSearchRequest = await req.json();

    // Using Amadeus API for flight search
    const amadeus_api_key = Deno.env.get('AMADEUS_API_KEY');
    const amadeus_api_secret = Deno.env.get('AMADEUS_API_SECRET');

    if (!amadeus_api_key || !amadeus_api_secret) {
      throw new Error('Amadeus API credentials not configured');
    }

    // Get Amadeus access token
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${amadeus_api_key}&client_secret=${amadeus_api_secret}`,
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Search flights
    const searchParams = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
      travelClass,
      max: '10'
    });

    if (returnDate) {
      searchParams.append('returnDate', returnDate);
    }

    const flightResponse = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const flightData = await flightResponse.json();

    // Transform data for our frontend
    const transformedFlights = flightData.data?.map((offer: any) => ({
      id: offer.id,
      price: {
        total: parseFloat(offer.price.total),
        currency: offer.price.currency,
      },
      itineraries: offer.itineraries.map((itinerary: any) => ({
        duration: itinerary.duration,
        segments: itinerary.segments.map((segment: any) => ({
          departure: {
            iataCode: segment.departure.iataCode,
            at: segment.departure.at,
          },
          arrival: {
            iataCode: segment.arrival.iataCode,
            at: segment.arrival.at,
          },
          carrierCode: segment.carrierCode,
          number: segment.number,
          aircraft: segment.aircraft?.code,
          duration: segment.duration,
        })),
      })),
      travelerPricings: offer.travelerPricings,
    })) || [];

    return new Response(
      JSON.stringify({
        success: true,
        data: transformedFlights,
        meta: flightData.meta,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Flight search error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});