import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({ actionName: z.string() });
	},
	handleServerError(err, utils) {
		const { metadata } = utils;

		console.error({
			message: err.message,
			actionName: metadata?.actionName,
		});

		return err.message;
	},
});

export { actionClient };
