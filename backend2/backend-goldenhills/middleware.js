import { NextResponse } from 'next/server';

// Allowed origins from environment or defaults
const allowedOrigins = process.env.ALLOWED_ORIGINS ? 
  process.env.ALLOWED_ORIGINS.split(',') : 
  ['https://goldenhillls.com', 'https://www.goldenhillls.com', 'http://localhost:8080'];

// This middleware runs on all API routes
export function middleware(request) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || '';
  const isAllowed = allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development';
  
  // Response object to modify and return
  const response = NextResponse.next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', isAllowed ? origin : '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  return response;
}

// This config ensures middleware only runs on API routes
export const config = {
  matcher: '/api/:path*',
};
