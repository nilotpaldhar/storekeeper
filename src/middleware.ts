import { NextResponse } from "next/server";

import {
	API_AUTH_PREFIX,
	DEFAULT_LOGIN_REDIRECT,
	LOGIN_ROUTE,
	PROTECTED_PREFIX,
	PUBLIC_PREFIXES,
	PUBLIC_ROUTES,
} from "@/constants/routes";

import { auth } from "@/lib/auth/config";

export default auth((req) => {
	const { nextUrl } = req;
	const pathname = nextUrl.pathname;
	const isLoggedIn = !!req.auth;

	// Classify the request
	const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
	const isApiRoute = pathname.startsWith("/api");

	const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
	const isPublicPrefixed = PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));

	const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);

	const isAuthRoute = pathname.startsWith(LOGIN_ROUTE);

	// 1. Always let API auth through
	if (isApiAuthRoute) {
		return NextResponse.next();
	}

	// 2. Let all other APIs through unprotected
	if (isApiRoute) {
		return NextResponse.next();
	}

	// 3. If it's an auth route & user is logged in -> go home
	if (isAuthRoute && isLoggedIn) {
		return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	}

	// 4. If it's an auth route & user is not logged in -> allow
	if (isAuthRoute && !isLoggedIn) {
		return NextResponse.next();
	}

	// 5. If it's public -> allow
	if (isPublicRoute || isPublicPrefixed) {
		return NextResponse.next();
	}

	// 6. If it's a protected route & user is NOT logged in -> redirect to login
	if (isProtectedRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL(LOGIN_ROUTE, nextUrl));
	}

	// 7. Anything else -> allow through
	// Let Next.js handle any 404s naturally
	return NextResponse.next();
});

// This matcher applies it to all pages & APIs, but filters out static files and _next
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
