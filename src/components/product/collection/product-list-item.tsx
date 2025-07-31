import type { ProductSummary } from "@/types/domain.types";

import Link from "next/link";

import {
	Title,
	Description,
	Category,
	Price,
	Thumbnail,
} from "@/components/product/collection/product-elements";
import { WishlistButton } from "@/components/product/collection/wishlist-button";

const ProductListItem = ({
	product: { title, description, slug, taxon, gallery, price },
}: {
	product: ProductSummary;
}) => {
	const image = gallery.at(0) ?? null;

	return (
		<div className="group relative border-b border-neutral-100 pb-8">
			<Link
				href={`/products/${slug}`}
				target="_blank"
				rel="noopener noreferrer"
				className="block text-inherit hover:text-inherit"
			>
				<article className="flex items-center space-x-4 md:space-x-8">
					<div className="relative flex aspect-square h-52 items-center justify-center bg-neutral-50 lg:h-60">
						<Thumbnail title={title} image={image} />
						<div className="pointer-events-none absolute top-2.5 right-2.5 scale-75 opacity-0 transition duration-300 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
							<WishlistButton />
						</div>
					</div>
					<div className="flex-1">
						<div className="space-y-2">
							<Category category={taxon} />
							<Title title={title} className="text-lg" />
							<Description description={description ?? "N/A"} className="font-light" />
						</div>
						<div className="pt-6">
							<Price price={price} />
						</div>
					</div>
				</article>
			</Link>
		</div>
	);
};

export { ProductListItem };
