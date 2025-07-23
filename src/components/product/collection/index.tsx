import type { ProductSummary } from "@/types/domain.types";

import { ProductGridItem } from "@/components/product/collection/product-grid-item";
import { ProductListItem } from "@/components/product/collection/product-list-item";

type ProductCollectionProps = {
	products: ProductSummary[];
	layout?: "grid" | "list";
};

const ProductCollection = ({ products, layout = "grid" }: ProductCollectionProps) => {
	if (layout === "list") {
		return (
			<div className="grid grid-cols-1 gap-y-6 md:gap-y-8">
				{products.map((product, idx) => (
					<div key={product._key ? `${product._key}-${product.id}` : `${product.id}-${idx}`}>
						<ProductListItem product={product} />
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:grid-cols-4 lg:gap-y-10 xl:grid-cols-5 xl:gap-x-5">
			{products.map((product, idx) => (
				<div key={product._key ? `${product._key}-${product.id}` : `${product.id}-${idx}`}>
					<ProductGridItem product={product} />
				</div>
			))}
		</div>
	);
};

export { ProductCollection };
