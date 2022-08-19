import { NextResponse } from 'next/server'

const Protected = [
  '/dashboard'
]


export default async function middleware(request) {
  const response = NextResponse.next();
  
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return response;
  }
  
  if (
    Protected.includes(request.nextUrl.pathname) &&
    !request.headers.get('x-replit-user-id')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  response.cookies.set('user', JSON.stringify({
    loggedIn: Boolean(request.headers.get('x-replit-user-id')),
    username: request.headers.get('x-replit-user-name'),
    id: parseInt(request.headers.get('x-replit-user-id'))
  }));
  return response;
}
