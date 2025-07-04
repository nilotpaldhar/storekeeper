import { ILLUSTRATIONS } from "@/constants/media";
import type { ProductImage } from "@/types/domain.types";
import Image from "next/image";

type ProductImageGalleryProps = {
	gallery: ProductImage[];
};

const ProductImageGallery = ({ gallery }: ProductImageGalleryProps) => {
	return (
		<div className="grid grid-cols-2 gap-5">
			{gallery.map(({ refKey, src, alt }) => {
				return (
					<div key={refKey} className="aspect-square bg-neutral-50">
						<Image
							src={src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT}
							alt={alt ?? ""}
							width={400}
							height={400}
						/>
					</div>
				);
			})}
		</div>
	);
};

export { ProductImageGallery };
