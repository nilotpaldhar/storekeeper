import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { logEvent } from "@/lib/logging/log-event";

const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({ actionName: z.string() });
	},
	handleServerError(err, utils) {
		const { metadata } = utils;
		logEvent({ level: "error", fn: metadata?.actionName, event: "fail", error: err });
		return err.message;
	},
});

export { actionClient };
