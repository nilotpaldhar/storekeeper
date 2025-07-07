/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";

import { logEvent } from "@/lib/logging/log-event";

type Handler = (req: NextRequest, context: any) => Promise<NextResponse>;

/**
 * Higher-order function to wrap Next.js API route handlers with standardized logging
 */
const withLogger = (label: string, handler: Handler): Handler => {
	return async (req, context) => {
		const start = Date.now();
		// Log request start
		logEvent({
			level: "info",
			fn: label,
			event: "start",
			data: { method: req.method, url: req.url },
		});

		try {
			const response = await handler(req, context);
			const duration = Date.now() - start;
			// Log request completed
			logEvent({
				level: "info",
				fn: label,
				event: "success",
				data: { status: response.status, durationMs: duration },
			});
			return response;
		} catch (error: unknown) {
			const duration = Date.now() - start;
			// Log failure
			logEvent({
				level: "error",
				fn: label,
				event: "fail",
				durationMs: duration,
				error,
			});
			// Return sanitized response
			return NextResponse.json(
				{ error: "Internal Server Error", code: "INTERNAL_ERROR" },
				{ status: 500 }
			);
		}
	};
};

export { withLogger };
