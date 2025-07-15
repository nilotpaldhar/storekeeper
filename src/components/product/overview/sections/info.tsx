import type { ProductDetails } from "@/types/domain.types";

import { PricingSummary } from "@/components/product/overview/pricing-summary";
import { RatingSummary } from "@/components/product/overview/rating-summary";

const InfoSection = ({
	brand,
	title,
	activeSku,
}: {
	brand: string | undefined;
	title: string;
	activeSku: ProductDetails["sku"] | null;
}) => (
	<>
		<div className="flex flex-col space-y-2">
			<p className="text-base leading-6 font-bold text-neutral-500 uppercase">{brand}</p>
			<h1 className="text-2xl leading-8 font-semibold">{title}</h1>
		</div>
		<div className="flex flex-wrap items-center gap-6 pt-4">
			<div aria-labelledby="product-rating" className="hidden md:block">
				<RatingSummary />
			</div>
			<div aria-labelledby="product-price">
				<PricingSummary sku={activeSku} />
			</div>
		</div>
	</>
);

export { InfoSection };
