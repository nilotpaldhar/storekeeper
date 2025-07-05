import type { ProductSku } from "@/types/domain.types";

import { Skeleton } from "@/components/ui/skeleton";
import { useProductPrice } from "@/hooks/product";

type ProductPricingProps = {
	sku: ProductSku | null;
};

const ProductPricing = ({ sku }: ProductPricingProps) => {
	const { data, isLoading, isError } = useProductPrice({
		skuId: sku?.id ?? "",
		enabled: !!sku?.id,
	});
	const { formatted_compare_at_amount, formatted_amount } = data?.data ?? {};

	if (isLoading) {
		return (
			<div className="flex items-center space-x-4 text-lg leading-none">
				<Skeleton className="h-[18px] w-20 rounded-xs" />
				<Skeleton className="h-[18px] w-20 rounded-xs" />
			</div>
		);
	}

	if (!isLoading && isError) {
		return (
			<div className="text-error-600 text-lg leading-none">
				<span className="font-extrabold capitalize">Price unavailable</span>
			</div>
		);
	}

	return (
		<div className="flex items-center space-x-4 text-lg leading-none">
			{formatted_compare_at_amount ? (
				<span className="font-normal text-neutral-500 line-through">
					<del>{formatted_compare_at_amount}</del>
				</span>
			) : null}
			{formatted_amount ? (
				<span className="font-extrabold">
					<ins className="no-underline">{formatted_amount}</ins>
				</span>
			) : null}
		</div>
	);
};

export { ProductPricing };
//
