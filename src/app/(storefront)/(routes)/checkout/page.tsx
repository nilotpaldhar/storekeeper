import type { Metadata } from "next";

import { CheckoutContent } from "@/components/checkout/content";
import { CheckoutError } from "@/components/checkout/error";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Checkout", shareTitle: "Checkout" });
};

type CheckoutPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
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

	return <CheckoutContent orderId={orderId} />;
};

export default CheckoutPage;
