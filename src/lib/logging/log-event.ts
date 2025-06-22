import { logger } from "@/lib/logging/logger";

type LogEventInput = {
	level?: "info" | "debug" | "warn" | "error";
	fn: string; // e.g., "fetchProduct"
	event: "start" | "success" | "fail";
	data?: unknown;
	error?: unknown;
	durationMs?: number;
};

const logEvent = ({ level = "info", fn, event, data, error, durationMs }: LogEventInput) => {
	const meta: Record<string, unknown> = { fn, event };

	if (typeof durationMs === "number") {
		meta.durationMs = durationMs;
	}

	if (data !== undefined) {
		meta.data = data; // now safe: data is unknown, `meta` accepts unknown
	}

	if (error) {
		if (error instanceof Error) {
			meta.message = error.message;
			meta.stack = error.stack;
		} else {
			meta.message = String(error);
		}
		logger.error(`[${fn}] ${event}`, meta);
		return;
	}

	logger[level](`[${fn}] ${event}`, meta);
};

export { logEvent };
