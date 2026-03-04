// Helper to communicate with the BunnyEra Claw Gateway via HTTP

const DEFAULT_GATEWAY_URL = process.env.NEXT_PUBLIC_BUNNYERA_GATEWAY_URL || 'http://localhost:8080';

export async function callClawApi(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
  // In a real scenario, we might read the gateway URL from a cookie or env
  // For now, we use the env variable or default
  const baseUrl = DEFAULT_GATEWAY_URL.replace('ws://', 'http://').replace('wss://', 'https://');
  const url = `${baseUrl}${endpoint}`;

  console.log(`[ClawAPI] ${method} ${url}`, body);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // If we had the token here
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Claw API error: ${response.statusText}`);
    }

    // Return JSON if content-type is json, otherwise text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    console.error('[ClawAPI] Request failed:', error);
    // In production, we should throw the error to let the caller handle it
    throw error;
  }
}
