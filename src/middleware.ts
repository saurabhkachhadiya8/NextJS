import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const token = req.cookies.get("token")?.value || '';
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', req.url));
    }
    if (!isPublicPath && !token && path !== "/") {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// See "Matching Paths" below to learn more
export const config = [{
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
    ]
}]