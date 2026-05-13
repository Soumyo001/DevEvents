import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/login(.*)','/signup(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isApiRoute = createRouteMatcher(['/api(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;

    if(isApiRoute(req)) return NextResponse.next();

    if(!userId && !isPublicRoute(req)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if(userId && isPublicRoute(req)) {
        if(role === "admin") return NextResponse.redirect(new URL("/admin/home", req.url));
        return NextResponse.redirect(new URL("/home", req.url));
    }

    if(userId && isAdminRoute(req) && role !== "admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}