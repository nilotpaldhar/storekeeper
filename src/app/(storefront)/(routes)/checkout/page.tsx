import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Checkout", shareTitle: "Checkout" });
};

const CheckoutPage = () => {
	return (
		<main>
			<Container className="py-10 text-center">
				<h1 className="text-2xl">Checkout Page</h1>
			</Container>
		</main>
	);
};

export default CheckoutPage;
