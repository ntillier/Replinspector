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

  //response.cookies.set('user', JSON.stringify(/*await getUser(request)*/{}));
  return response;
}
