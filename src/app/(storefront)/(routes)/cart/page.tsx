import type { Metadata } from "next";

import { CartItemList } from "@/components/cart/item-list";
import { CartSummary } from "@/components/cart/summary";
import { Container } from "@/components/ui/container";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Shopping Cart", shareTitle: "Shopping Cart" });
};

const CartPage = () => {
	return (
		<main className="pt-10 pb-14">
			<Container className="grid grid-cols-12 gap-6">
				<section className="col-span-full xl:col-span-8">
					<CartItemList />
				</section>
				<section className="col-span-full xl:col-span-4">
					<div className="xl:sticky xl:top-4">
						<CartSummary />
					</div>
				</section>
			</Container>
		</main>
	);
};

export default CartPage;

{
	/* <main className="flex min-h-[80vh] items-center justify-center py-5">
	<Container className="flex justify-center">
		<CartError className="flex-1" />
	</Container>
</main>; */
}

{
	/* <main className="flex min-h-[80vh] items-center justify-center py-5">
	<Container className="flex justify-center">
		<CartEmpty className="flex-1" />
	</Container>
</main>; */
}

{
	/* <main className="pt-10 pb-14">
			<Container className="grid grid-cols-12 gap-6">
				<section className="col-span-8">
					<CartItemList />
				</section>
				<section className="col-span-4">
					<div className="sticky top-4">
						<CartSummary />
					</div>
				</section>
			</Container>
		</main> */
}
