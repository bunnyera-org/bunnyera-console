import { NextRequest, NextResponse } from 'next/server';
import { callClawApi } from '@/lib/api/claw';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, params } = body;

    if (!type) {
      return NextResponse.json({ error: 'Task type is required' }, { status: 400 });
    }

    console.log(`[API] Triggering task: ${type}`, params);
    
    // Call Claw API
    const result = await callClawApi('/tasks', 'POST', { type, params });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Task trigger failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
