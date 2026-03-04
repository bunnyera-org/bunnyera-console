import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gatewayUrl, environment, token } = body;

    // In a real app, you might validate these or store them in a database.
    // Since this is a client-side focused console, we primarily rely on the client
    // storing these in localStorage/cookies.
    // However, we can set HTTP-only cookies here for server-side rendering context if needed.
    
    const response = NextResponse.json({ success: true });

    if (token) {
      response.cookies.set('bunnyera_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
    }

    if (gatewayUrl) {
       response.cookies.set('bunnyera_gateway_url', gatewayUrl, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
