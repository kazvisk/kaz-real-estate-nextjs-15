import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/contact', process.env.NODE_ENV === 'production' ? 'http://kazviskrealty.com' : 'http://localhost:3002'));
}