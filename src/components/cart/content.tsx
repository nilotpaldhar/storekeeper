"use client";

import { useCart } from "@/hooks/cart";

import { CartEmpty } from "@/components/cart/empty";
import { CartError } from "@/components/cart/error";
import { CartItemList } from "@/components/cart/item-list";
import { CartSummary } from "@/components/cart/summary";
import { Container } from "@/components/ui/container";
import { ThreeDotsLoader } from "@/components/ui/loader";

const CartContentStateWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex min-h-[80vh] items-center justify-center py-5">
			<Container className="flex justify-center">{children}</Container>
		</main>
	);
};

const CartContent = () => {
	const { data, isLoading, isError, error, refetch } = useCart();

	const summary = data?.data?.summary;
	const items = data?.data?.items || [];
	const skusCount = summary?.skus_count ?? 0;

	const isEmpty = !isLoading && !isError && skusCount === 0;

	if (isLoading) {
		return (
			<CartContentStateWrapper>
				<ThreeDotsLoader />
			</CartContentStateWrapper>
		);
	}

	if (isError) {
		return (
			<CartContentStateWrapper>
				<CartError className="flex-1" message={error.message} onRetry={refetch} />
			</CartContentStateWrapper>
		);
	}

	if (isEmpty) {
		return (
			<CartContentStateWrapper>
				<CartEmpty className="flex-1" />
			</CartContentStateWrapper>
		);
	}

	return (
		<main className="pt-10 pb-14">
			<Container className="grid grid-cols-12 gap-6">
				{items ? (
					<section className="col-span-full xl:col-span-8">
						<CartItemList items={items} />
					</section>
				) : null}

				{summary ? (
					<section className="col-span-full xl:col-span-4">
						<div className="xl:sticky xl:top-4">
							<CartSummary summary={summary} />
						</div>
					</section>
				) : null}
			</Container>
		</main>
	);
};

export { CartContent };
