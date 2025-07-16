"use client";

import { useState } from "react";

import { CheckoutDisclaimer } from "@/components/checkout/disclaimer";
import { CheckoutFlow } from "@/components/checkout/flow";
import { CheckoutStepper } from "@/components/checkout/stepper";
import { CheckoutSummary } from "@/components/checkout/summary";
import { Container } from "@/components/ui/container";
import { ThreeDotsLoader } from "@/components/ui/loader";

const CheckoutContent = () => {
	const [isPending, setIsPending] = useState(false);

	const handlePlaceOrder = () => {
		setIsPending(true);
		setTimeout(() => setIsPending(false), 5000);
	};

	if (isPending) {
		return (
			<main className="flex min-h-[80vh] items-center justify-center py-5">
				<Container className="flex justify-center">
					<ThreeDotsLoader />
				</Container>
			</main>
		);
	}

	return (
		<main className="pt-10 pb-14">
			<Container>
				<div className="mx-auto max-w-3xl space-y-10 sm:space-y-14">
					<section>
						<CheckoutStepper />
					</section>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<section className="">
							<CheckoutFlow onPlaceOrder={handlePlaceOrder} />
						</section>
						<section className="space-y-6">
							<CheckoutSummary />
							<CheckoutDisclaimer />
						</section>
					</div>
				</div>
			</Container>
		</main>
	);
};

export { CheckoutContent };
