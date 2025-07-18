"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { toast } from "sonner";

import { useAttachCustomerToOrder } from "@/hooks/orders";
import { useCurrentUser } from "@/hooks/user/use-current-user";

import { type CheckoutData, useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { UserDetailsForm } from "@/components/checkout/steps/user-details-step/form";
import { UserDetailsPreview } from "@/components/checkout/steps/user-details-step/preview";
import { UserDetailsSummary } from "@/components/checkout/steps/user-details-step/summary";
import { ThreeDotsLoader } from "@/components/ui/loader";

import { cn } from "@/lib/utils/general/cn";

const UserDetailsStep = ({ orderId, completed, onStepComplete }: CheckoutStepProps) => {
	const setCheckoutData = useCheckoutStepsStore().setCheckoutData;
	const attachCustomerMutation = useAttachCustomerToOrder();

	const { data, isPending } = useCurrentUser();
	const currentUser = data?.data;

	const handleOnContinue = async ({ name, email }: Partial<CheckoutData["customer"]>) => {
		if (!email) return;

		attachCustomerMutation.mutate(
			{ orderId, email },
			{
				onError: (error) =>
					toast.error(error.message ?? "Failed to attach customer to the order. Try again."),
				onSuccess: () => {
					setCheckoutData("customer", { name, email });
					onStepComplete();
				},
			}
		);
	};

	return (
		<div>
			{completed ? (
				<UserDetailsPreview />
			) : (
				<div className={cn(isPending && "py-20")}>
					{isPending ? (
						<ThreeDotsLoader />
					) : (
						<>
							{currentUser ? (
								<UserDetailsSummary
									user={currentUser}
									isLoading={attachCustomerMutation.isPending}
									onContinue={handleOnContinue}
								/>
							) : (
								<UserDetailsForm
									isLoading={attachCustomerMutation.isPending}
									onContinue={handleOnContinue}
								/>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export { UserDetailsStep };
