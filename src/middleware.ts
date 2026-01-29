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


import default1 from 'next-auth/middleware';
console.log('middleware default', typeof default1, default1);

export const config = {
  matcher: [
    '/dashboard'
  ]
}

export default default1;