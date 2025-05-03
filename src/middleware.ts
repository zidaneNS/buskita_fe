import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

// const publicRoutes = ['/', '/auth'];
const protectedRoutes = ['/schedule', '/myschedule', '/dashboard'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    // const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute: boolean = protectedRoutes.some(route => path.startsWith(route));

    const cookie = (await cookies()).get('session')?.value;
    
    const session = await decrypt(cookie);
    if (isProtectedRoute && !session?.token) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}