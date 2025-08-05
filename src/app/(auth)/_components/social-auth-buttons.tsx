"use client";

import { useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { socialLoginAction } from "@/actions/auth/social-login";

import { Google } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";

const SocialAuthButtons = () => {
	const { execute, isPending } = useAction(socialLoginAction);
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	return (
		<div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
			<Button
				disabled={isPending}
				onClick={() => execute({ provider: "google", callbackUrl: callbackUrl ?? "" })}
				className="bg-social-google hover:bg-social-google w-full sm:flex-1"
			>
				<Google className="size-3.5 fill-current" />
				<span>Google</span>
			</Button>
		</div>
	);
};

export { SocialAuthButtons };
