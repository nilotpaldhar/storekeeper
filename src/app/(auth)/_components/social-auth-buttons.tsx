"use client";

import { Button } from "@/components/ui/button";
import { Google, Facebook } from "@/components/icons/brand";
import { cn } from "@/lib/utils/general/cn";

const providers = [
	{ label: "Google", icon: Google },
	{ label: "Facebook", icon: Facebook },
];

const SocialAuthButtons = () => {
	return (
		<div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
			{providers.map(({ label, icon: Icon }) => (
				<Button
					key={label}
					className={cn(
						"w-full sm:flex-1",
						label.toLowerCase() === "google" && "bg-social-google hover:bg-social-google",
						label.toLowerCase() === "facebook" && "bg-social-facebook hover:bg-social-f"
					)}
				>
					<Icon className="size-3.5 fill-current" />
					<span>{label}</span>
				</Button>
			))}
		</div>
	);
};

export { SocialAuthButtons };
