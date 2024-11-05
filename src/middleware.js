// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse} from "next/server";
import { doesRoleHaveAccessToURL } from "./utils/RoleBasedAccessControl/accessControl";


export async function middleware(req) {
    console.log("Middleware is running"); // ล็อกเพื่อตรวจสอบว่าทำงานอยู่

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    const url = req.nextUrl.clone();
    const {pathname , origin} = req.nextUrl
    
    if (!token) {
        url.pathname = "/auth/login";
        // url.searchParams.set('error', 'login_required'); // เพิ่มพารามิเตอร์ error
        url.searchParams.set('authRequired', 'true'); // เปลี่ยนชื่อ query parameter
        console.log("No token found, redirecting to login with error parameter"); // ล็อกเมื่อไม่มี session
        return NextResponse.redirect(url);
    }
   

    if (req.method === 'GET' && !token.permissions.read) {
        // ถ้าผู้ใช้ไม่มีสิทธิ์ read และพยายามเข้าถึงหน้า get-resource ก็ redirect ไปยังหน้า 403
        console.log('permissions is not denied ');
        url.pathname = '/403';
        return NextResponse.rewrite(url);
    }

    //*  Redirect based on session อีกวิธี โดยการตรวจสอบ pathname และ token ถ้ามีอยู่แล้วก็ให้ไปยัง path origin(ถ้ามีเงื่อนไขให้ไปทำที่ app/page.js)
    // if(pathname === '/auth/login') {
        //    if(token) {
    //     return NextResponse.redirect(`${origin}`);
    //    }
    // }
    
     // ตรวจสอบบทบาทของผู้ใช้ โดยกำหนด role ไว้ที่ roleAccess.js
    const role = token.role;
    const hasAccess = doesRoleHaveAccessToURL(role, req.nextUrl.pathname);
    if (!hasAccess) {
        console.log("Access denied for user role, redirecting to 403 page");
        const url = req.nextUrl.clone();
        url.pathname = "/errors/403"; // กำหนดเส้นทางสำหรับหน้า 403
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/home/:path*',
         '/dashboard/:path*', 
        // '/api/admins/:path*' 
        // ,"/auth/register"
    ],
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