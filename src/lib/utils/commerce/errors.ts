import type { ApiError } from "@commercelayer/sdk";

const isCLApiError = (err: unknown): err is ApiError => {
	return typeof err === "object" && err !== null && "type" in err && "errors" in err;
};

export { isCLApiError };
