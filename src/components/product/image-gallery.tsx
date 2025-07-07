import type { ProductImage } from "@/types/domain.types";

import Image from "next/image";

import { ILLUSTRATIONS } from "@/constants/media";

type ProductImageGalleryProps = {
	gallery: ProductImage[];
};

const ProductImageGallery = ({ gallery }: ProductImageGalleryProps) => {
	return (
		<div className="grid grid-cols-2 gap-5">
			{gallery.map(({ refKey, src, alt }) => {
				return (
					<div key={refKey} className="aspect-square overflow-hidden bg-neutral-50">
						<div className="transition-transform duration-300 hover:scale-105">
							<Image
								src={src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT}
								alt={alt ?? ""}
								width={400}
								height={400}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export { ProductImageGallery };
