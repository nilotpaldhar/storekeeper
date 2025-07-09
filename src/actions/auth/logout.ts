"use server";

import { LOGIN_ROUTE } from "@/constants/routes";

import { signOut } from "@/lib/auth/config";
import { actionClient } from "@/lib/safe-action";

const logoutAction = actionClient.metadata({ actionName: "loginAction" }).action(async () => {
	await signOut({ redirectTo: LOGIN_ROUTE });
	return { message: `A login link has been sent to your email.` };
});

export { logoutAction };
