import type { ProductSummary } from "@/types/domain.types";

import Link from "next/link";

import {
	Title,
	Category,
	Price,
	Thumbnail,
} from "@/components/product/collection/product-elements";
import { WishlistButton } from "@/components/product/collection/wishlist-button";

const ProductGridItem = ({
	product: { title, slug, taxon, gallery, price },
}: {
	product: ProductSummary;
}) => {
	const image = gallery.at(0) ?? null;

	return (
		<div className="group relative rounded-xs border border-transparent transition-all duration-300 hover:border-neutral-100 hover:shadow-xs">
			<Link
				href={`/products/${slug}`}
				target="_black"
				rel="noopener noreferrer"
				className="block w-full text-neutral-900 hover:text-neutral-900"
			>
				<article>
					<div className="flex h-60 w-full items-center justify-center overflow-hidden bg-neutral-50">
						<Thumbnail title={title} image={image} />
					</div>
					<div className="space-y-1.5 overflow-hidden px-3 py-4 text-center">
						<Category category={taxon} />
						<Title title={title} />
						<Price price={price} className="flex justify-center text-center" />
					</div>
				</article>
			</Link>
			<div className="pointer-events-none absolute top-2.5 right-2.5 scale-75 opacity-0 transition duration-300 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
				<WishlistButton />
			</div>
		</div>
	);
};

export { ProductGridItem };

//
