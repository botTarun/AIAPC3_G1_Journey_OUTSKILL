import { corsHeaders } from '../_shared/cors.ts';

interface HotelSearchRequest {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  rooms?: number;
  children?: number;
  priceRange?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cityCode, checkInDate, checkOutDate, adults, rooms = 1, children = 0 }: HotelSearchRequest = await req.json();

    // Using Amadeus API for hotel search
    const amadeus_api_key = Deno.env.get('AMADEUS_API_KEY');
    const amadeus_api_secret = Deno.env.get('AMADEUS_API_SECRET');

    if (!amadeus_api_key || !amadeus_api_secret) {
      throw new Error('Amadeus API credentials not configured');
    }

    // Get access token
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${amadeus_api_key}&client_secret=${amadeus_api_secret}`,
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Search hotels by city
    const hotelListResponse = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=20&radiusUnit=KM&hotelSource=ALL`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const hotelListData = await hotelListResponse.json();
    const hotelIds = hotelListData.data?.slice(0, 20).map((hotel: any) => hotel.hotelId).join(',') || '';

    if (!hotelIds) {
      return new Response(
        JSON.stringify({
          success: true,
          data: [],
          message: 'No hotels found for this location',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get hotel offers
    const searchParams = new URLSearchParams({
      hotelIds,
      checkInDate,
      checkOutDate,
      adults: adults.toString(),
      roomQuantity: rooms.toString(),
    });

    if (children > 0) {
      searchParams.append('childAges', Array(children).fill('10').join(','));
    }

    const offersResponse = await fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const offersData = await offersResponse.json();

    // Transform data for frontend
    const transformedHotels = offersData.data?.map((hotel: any) => ({
      id: hotel.hotel.hotelId,
      name: hotel.hotel.name,
      rating: hotel.hotel.rating,
      location: {
        latitude: hotel.hotel.latitude,
        longitude: hotel.hotel.longitude,
        address: hotel.hotel.address,
      },
      contact: hotel.hotel.contact,
      amenities: hotel.hotel.amenities || [],
      offers: hotel.offers.map((offer: any) => ({
        id: offer.id,
        checkInDate: offer.checkInDate,
        checkOutDate: offer.checkOutDate,
        roomQuantity: offer.roomQuantity,
        rateCode: offer.rateCode,
        room: {
          type: offer.room.type,
          typeEstimated: offer.room.typeEstimated,
          description: offer.room.description,
        },
        guests: offer.guests,
        price: {
          currency: offer.price.currency,
          base: parseFloat(offer.price.base),
          total: parseFloat(offer.price.total),
          variations: offer.price.variations,
        },
        policies: offer.policies,
        self: offer.self,
      })),
    })) || [];

    return new Response(
      JSON.stringify({
        success: true,
        data: transformedHotels,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Hotel search error:', error);
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