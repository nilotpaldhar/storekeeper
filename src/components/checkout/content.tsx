"use client";

import { useOrder } from "@/hooks/orders";

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

const INVALID_ORDER_STATUS = ["approved", "cancelled", "placed", "editing", "placing"];

const CheckoutContent = ({ orderId, showDisclaimer = false }: CheckoutContentProps) => {
	const { data, isLoading, isFetching, isError, error } = useOrder({
		id: orderId,
	});

	const isUpdating = !isLoading && isFetching;
	const summary = data?.data?.summary;
	const items = data?.data?.items;
	const orderStatus = data?.data?.summary.status ?? "";

	const handlePlaceOrder = () => {};

	if (isLoading) {
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

	if (!isLoading && !isError && INVALID_ORDER_STATUS.includes(orderStatus)) {
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
							<CheckoutFlow onPlaceOrder={handlePlaceOrder} />
						</section>
						<section className="space-y-6">
							{summary && items ? <CheckoutSummary summary={summary} items={items} /> : null}
							{showDisclaimer ? <CheckoutDisclaimer /> : null}
						</section>
					</div>
				</div>
			</Container>
		</main>
	);
};

export { CheckoutContent };

// lalhzaJvGy - placed
// xzYheEDmzJ - current
