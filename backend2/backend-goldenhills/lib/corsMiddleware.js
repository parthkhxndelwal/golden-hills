// This file sets up CORS middleware for the API routes
// For more information: https://nextjs.org/docs/api-routes/request-helpers

import { NextResponse } from 'next/server';

// List of allowed origins
const allowedOrigins = [
  'https://goldenhillls.com/',
  'https://www.goldenhillls.com/',
  'http://localhost:8080/'
];

// This function can be exported from anywhere and imported into route handlers
export function corsMiddleware(handler) {
  return async (request) => {
    const origin = request.headers.get('origin') || '';
    const isAllowed = allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development';
    
    // Handle OPTIONS preflight request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': isAllowed ? origin : '',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Handle the actual request
    const response = await handler(request);
    
    // Add CORS headers to response
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', isAllowed ? origin : '*');
    
    return NextResponse.json(
      await response.json(),
      { 
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      }
    );
  };
}
