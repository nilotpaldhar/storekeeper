"use server";

import { revalidateTag } from "next/cache";

import { signOut } from "@/lib/auth/config";
import { actionClient } from "@/lib/safe-action";

const logoutAction = actionClient
	.metadata({ actionName: "loginAction" })

	.action(async () => {
		await signOut({ redirect: false });
		revalidateTag("get-user-by-id");
		return { message: `You have been successfully logged out.` };
	});

export { logoutAction };
