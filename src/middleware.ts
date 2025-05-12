import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

// const publicRoutes = ['/', '/auth'];
const protectedRoutes = ['/schedule', '/myschedule', '/dashboard', '/telegram'];

export default async function middleware(req: NextRequest) {
    const baseUrl = process.env.BASE_URL
    const path = req.nextUrl.pathname;
    // const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute: boolean = protectedRoutes.some(route => path.startsWith(route));

    const cookie = (await cookies()).get('session')?.value;
    
    const session = await decrypt(cookie);
    if (isProtectedRoute && !session?.token) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }
    
    const response = await fetch(`${baseUrl}/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    });
    
    if (response.status === 401 && session?.token) {
        console.log('will redirect invalid action');
        return NextResponse.redirect(new URL('/invalid', req.nextUrl));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|invalid).*)'],
}