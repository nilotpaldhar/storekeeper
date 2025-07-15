import type { Metadata } from "next";

import { CartContent } from "@/components/cart/content";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Shopping Cart", shareTitle: "Shopping Cart" });
};

const CartPage = () => {
	return <CartContent />;
};

export default CartPage;
