import type { Metadata } from "next";

import { CheckoutContent } from "@/components/checkout/content";
import { CheckoutError } from "@/components/checkout/error";

import { getOrder } from "@/lib/resources/orders/fetch";
import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Checkout", shareTitle: "Checkout" });
};

type CheckoutPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
	const orderId = (await searchParams).order_id;
	const isValidOrderId = orderId && !Array.isArray(orderId);
	const order = isValidOrderId ? await getOrder({ id: orderId, status: "draft" }) : null;

	if (!order) {
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

	return <CheckoutContent />;
};

export default CheckoutPage;
