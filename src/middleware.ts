// import { NextResponse, NextRequest } from "next/server";

// export function middleware (request: NextRequest) {
//   const data = request.url
//   console.log('Running', data);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/dashboard'
//   ]
// }


export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard'
  ]
}