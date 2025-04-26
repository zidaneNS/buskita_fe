import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const publicRoutes = ['/', '/auth'];
const protectedRoutes = ['/schedule', 'myschedule'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value;
    
    const session = await decrypt(cookie);
    if (isProtectedRoute && !session?.token) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}