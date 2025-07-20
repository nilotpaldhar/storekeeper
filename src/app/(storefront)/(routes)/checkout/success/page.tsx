import type { Metadata } from "next";

import { CheckoutError } from "@/components/checkout/error";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Checkout Success", shareTitle: "Checkout Success" });
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
		<main className="pt-10 pb-14">
			<h1 className="text-center text-3xl font-bold">Order Placed Successfully</h1>
		</main>
	);
};

export default CheckoutSuccessPage;
