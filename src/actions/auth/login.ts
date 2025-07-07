"use server";

import { flattenValidationErrors } from "next-safe-action";

import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";

import { signIn } from "@/lib/auth/config";
import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/lib/schemas";

const loginAction = actionClient
	.metadata({ actionName: "loginAction" })
	.inputSchema(LoginSchema, {
		handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { email, callbackUrl } }) => {
		await signIn("resend", { email, redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT });
		return { message: `A login link has been sent to your email.` };
	});

export { loginAction };
