"use server";

import { flattenValidationErrors } from "next-safe-action";

import { signIn } from "@/lib/auth/config";
import { SocialLoginSchema } from "@/lib/schemas";
import { actionClient } from "@/lib/safe-action";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";

const socialLoginAction = actionClient
	.metadata({ actionName: "socialLoginAction" })
	.inputSchema(SocialLoginSchema, {
		handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { provider, callbackUrl } }) => {
		await signIn(provider, { redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT });
		return { message: `Logged in successfully.` };
	});

export { socialLoginAction };
