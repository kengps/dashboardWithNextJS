// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { doesRoleHaveAccessToURL } from "./utils/RoleBasedAccessControl/accessControl";


export async function middleware(req) {
    console.log("Middleware is running"); // ล็อกเพื่อตรวจสอบว่าทำงานอยู่

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
       // url.searchParams.set('error', 'login_required'); // เพิ่มพารามิเตอร์ error
         url.searchParams.set('authRequired', 'true'); // เปลี่ยนชื่อ query parameter
       console.log("No token found, redirecting to login with error parameter"); // ล็อกเมื่อไม่มี session
        return NextResponse.redirect(url);
      }

     // ตรวจสอบบทบาทของผู้ใช้
    const role = token.role;
    const hasAccess = doesRoleHaveAccessToURL(role, req.nextUrl.pathname);
    console.log(`⩇⩇:⩇⩇🚨  file: middleware.js:24  hasAccess :`, hasAccess);


    if (!hasAccess) {
        const url = req.nextUrl.clone();
        url.pathname = "/403"; // กำหนดเส้นทางสำหรับหน้า 403
        console.log("Access denied for user role, redirecting to 403 page");
        return NextResponse.rewrite(url);
    }

    // if (!token) {
    //     const loginUrl = new URL('/auth/login', req.url);
    //     loginUrl.searchParams.set('error', 'login_required');
    //      console.log("No token found, redirecting to login"); // ล็อกเมื่อไม่มี session
    //     return NextResponse.redirect(loginUrl);
    // }

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