// Edge Function - Real-time Data Sync
// Deploy to Tencent EdgeOne for low latency

/**
 * Handle real-time influencer data requests
 * Cached at edge location for instant response
 */
export default async function handler(request) {
  // Enable CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const url = new URL(request.url);
    const influencerId = url.searchParams.get('id');

    if (!influencerId) {
      return new Response(JSON.stringify({ error: 'Missing influencer ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch from Supabase (cached at edge)
    const response = await fetch(
      \`https://your-supabase-url/influencers/\${influencerId}\`,
      {
        headers: {
          'Authorization': \`Bearer \${Deno.env.get('SUPABASE_ANON_KEY')}\`,
        },
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
