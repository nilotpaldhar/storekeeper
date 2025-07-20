"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useOrder, usePlaceOrder } from "@/hooks/orders";

import { INVALID_CHECKOUT_ORDER_STATUS } from "@/constants/commerce";
import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { CheckoutDisclaimer } from "@/components/checkout/disclaimer";
import { CheckoutError } from "@/components/checkout/error";
import { CheckoutFlow } from "@/components/checkout/flow";
import { CheckoutStepper } from "@/components/checkout/stepper";
import { CheckoutSummary } from "@/components/checkout/summary";
import { Container } from "@/components/ui/container";
import { ThreeDotsLoader } from "@/components/ui/loader";

import { cn } from "@/lib/utils/general/cn";

type CheckoutContentProps = {
	orderId: string;
	showDisclaimer?: boolean;
};

type InvalidCheckoutOrderStatusType = (typeof INVALID_CHECKOUT_ORDER_STATUS)[number];

const CheckoutContent = ({ orderId, showDisclaimer = false }: CheckoutContentProps) => {
	const router = useRouter();

	const resetCheckoutState = useCheckoutStepsStore().reset;
	const [isRedirecting, setIsRedirecting] = useState(false);

	const { data, isLoading, isFetching, isError, error } = useOrder({ id: orderId });
	const placeOrderMutation = usePlaceOrder();

	const isUpdating = !isLoading && isFetching;
	const summary = data?.data?.summary;
	const items = data?.data?.items;
	const orderStatus = data?.data?.summary.status ?? "";

	const handlePlaceOrder = () => {
		placeOrderMutation.mutate(
			{ orderId },
			{
				onError: (error) => toast.error(error.message),
				onSuccess: () => {
					setIsRedirecting(true);
					router.push(`/checkout/success?order_id=${orderId}`);
				},
				onSettled: () => resetCheckoutState(),
			}
		);
	};

	if (isLoading || placeOrderMutation.isPending || isRedirecting) {
		return (
			<main className="flex min-h-[80vh] items-center justify-center py-5">
				<Container className="flex justify-center">
					<ThreeDotsLoader />
				</Container>
			</main>
		);
	}

	if (!isLoading && isError) {
		return <CheckoutError title={error.message} />;
	}

	if (
		!isLoading &&
		!isError &&
		INVALID_CHECKOUT_ORDER_STATUS.includes(orderStatus as InvalidCheckoutOrderStatusType)
	) {
		return (
			<CheckoutError
				title="Order Not Valid for Checkout"
				message={
					<>
						<p>Your order can&apos;t be processed at this stage.</p>
						<p>Please review or contact support.</p>
					</>
				}
			/>
		);
	}

	return (
		<main className="pt-10 pb-14">
			<Container className={cn(isUpdating && "pointer-events-none opacity-50")}>
				<div className="mx-auto max-w-3xl space-y-10 sm:space-y-14">
					<section>
						<CheckoutStepper />
					</section>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<section className="">
							<CheckoutFlow orderId={orderId} onPlaceOrder={handlePlaceOrder} />
						</section>
						<section className="space-y-6">
							<div className="md:sticky md:top-4">
								{summary && items ? <CheckoutSummary summary={summary} items={items} /> : null}
								{showDisclaimer ? <CheckoutDisclaimer /> : null}
							</div>
						</section>
					</div>
				</div>
			</Container>
		</main>
	);
};

export { CheckoutContent };
