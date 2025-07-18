"use client";

import type { CheckoutData } from "@/stores/use-checkout-steps-store";
import type { UserProfile } from "@/types/domain.types";

import { useAction } from "next-safe-action/hooks";

import { logoutAction } from "@/actions/auth/logout";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type UserDetailsSummaryProps = {
	user: UserProfile;
	isLoading?: boolean;
	onContinue: (data: Partial<CheckoutData["customer"]>) => void;
};

const UserDetailsSummary = ({ user, isLoading = false, onContinue }: UserDetailsSummaryProps) => {
	const { execute, isPending } = useAction(logoutAction);

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
				<button
					type="button"
					className="text-primary-600 hover:text-primary-500 block cursor-pointer font-semibold disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isPending}
					onClick={() => execute()}
				>
					Logout & Sign in to another account
				</button>
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
