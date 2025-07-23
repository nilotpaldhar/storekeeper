"use client";

import type { CheckoutData } from "@/stores/use-checkout-steps-store";
import type { UserProfile } from "@/types/domain.types";

import { LogoutButton } from "@/components/auth/logout-button";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type UserDetailsSummaryProps = {
	user: UserProfile;
	isLoading?: boolean;
	onContinue: (data: Partial<CheckoutData["customer"]>) => void;
};

const UserDetailsSummary = ({ user, isLoading = false, onContinue }: UserDetailsSummaryProps) => {
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col items-start space-y-2">
				<div className="flex items-center space-x-4">
					<div className="w-10">Name:</div>
					<div className="font-medium">{user.name ?? "---"}</div>
				</div>
				<div className="flex items-center space-x-4">
					<div className="w-10">Email:</div>
					<div className="font-medium">{user.email}</div>
				</div>
				<LogoutButton variant="primary-ghost" className="h-max px-0 py-0 text-base font-semibold">
					Logout & Sign in to another account
				</LogoutButton>
			</div>
			<Button
				className="w-full"
				disabled={isLoading}
				onClick={() => onContinue({ name: user.name, email: user.email })}
			>
				{isLoading ? "Continue..." : "Continue"}
			</Button>
			<Alert variant="info" closable={false}>
				<div className="flex flex-col space-y-1">
					<div className="font-semibold">Please Note</div>
					<div className="text-xs font-normal">
						Be aware that if you click &quot;Logout&ldquo;, you will need to start the checkout
						process again.
					</div>
				</div>
			</Alert>
		</div>
	);
};

export { UserDetailsSummary };
