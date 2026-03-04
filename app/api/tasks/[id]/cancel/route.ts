import { NextRequest, NextResponse } from 'next/server';
import { callClawApi } from '@/lib/api/claw';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    console.log(`[API] Cancelling task: ${id}`);
    
    // Call Claw API
    const result = await callClawApi(`/tasks/${id}/cancel`, 'POST');

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Task cancel failed for ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
