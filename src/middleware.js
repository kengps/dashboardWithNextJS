// middleware.js
// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log("Middleware is running"); // ล็อกเพื่อตรวจสอบว่าทำงานอยู่

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      console.log("No token found, redirecting to login"); // ล็อกเมื่อไม่มี session
        return NextResponse.redirect(url);
    }

    console.log("Token found, allowing access"); // ล็อกเมื่อมี session แล้ว
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/protected-route/:path*"],
};



// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   console.log(`⩇⩇:⩇⩇🚨  file: middleware.js:25  request :`, request);

//   return NextResponse.redirect(new URL('/auth/login', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: ['/about/:path*', '/dashboard/:path*'],
//   }