import { NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/auth';

export async function GET(request) {
  const authResult = await authenticateToken(request);

  if (authResult.error) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  return NextResponse.json({
    user: authResult.user,
    valid: true
  });
}