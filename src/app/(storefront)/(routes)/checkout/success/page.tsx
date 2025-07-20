import type { Metadata } from "next";

import { CheckoutError } from "@/components/checkout/error";
import { CheckoutSuccessConfirmation } from "@/components/checkout/success-confirmation";
import { Container } from "@/components/ui/container";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	const title = "Order Confirmation - Thank You for Your Purchase";
	return getSeo({ metaTitle: title, shareTitle: title });
};

type CheckoutSuccessPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CheckoutSuccessPage = async ({ searchParams }: CheckoutSuccessPageProps) => {
	const orderId = (await searchParams).order_id;

	if (!orderId || Array.isArray(orderId)) {
		return (
			<CheckoutError
				title="Order Not Found"
				message={
					<>
						<p>The order ID you provided is invalid or does not exist.</p>
						<p>Please check the link or contact support for help.</p>
					</>
				}
			/>
		);
	}

	return (
		<main className="py-10 lg:py-14">
			<Container>
				<div className="mx-auto max-w-3xl">
					<CheckoutSuccessConfirmation orderId={orderId} />
				</div>
			</Container>
		</main>
	);
};

export default CheckoutSuccessPage;
