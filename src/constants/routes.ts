/**
 * Exact public routes that can be accessed by anyone,
 * with no authentication required.
 */
export const PUBLIC_ROUTES = [
	"/",
	"/studio", // Sanity studio — sanity handles its own auth
	"/search",
	"/cart",
	"/wishlist",
];

/**
 * Public route prefixes for dynamic or nested paths.
 * If the pathname starts with any of these, the request is treated as public.
 */
export const PUBLIC_PREFIXES = [
	"/products",
	"/collections",
	"/categories",
	"/checkout",
	"/login", // Auth route
	"/pages", // Static pages with rewrite — e.g., /:slug → /pages/[slug]
];

/**
 * The prefix used by NextAuth for authentication-related API routes.
 * These must be passed through the middleware unblocked.
 */
export const API_AUTH_PREFIX = "/api/auth";

/**
 * The prefix for routes that require authentication.
 * If the pathname starts with this prefix, user must be logged in.
 */
export const PROTECTED_PREFIX = "/dashboard";

/**
 * The default fallback redirect after a successful login
 * if no callbackUrl is provided (e.g., direct sign-in).
 */
export const DEFAULT_LOGIN_REDIRECT = "/" as const;

/**
 * Route where authenticated users land for their private dashboard.
 */
export const DASHBOARD_ROUTE = "/dashboard";

/**
 * Route for login / register (magic link, passwordless, etc.).
 */
export const LOGIN_ROUTE = "/login";
