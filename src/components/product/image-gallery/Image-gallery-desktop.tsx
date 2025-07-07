import type { ProductImage } from "@/types/domain.types";

import Image from "next/image";

import { ILLUSTRATIONS } from "@/constants/media";

type ProductImageGalleryDesktopProps = {
	gallery: ProductImage[];
};

const GalleryItem = ({ image: { src, alt } }: { image: Omit<ProductImage, "refKey"> }) => (
	<div className="flex aspect-square items-center justify-center overflow-hidden bg-neutral-50">
		<div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
			<Image
				src={src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT}
				alt={alt ?? ""}
				width={400}
				height={400}
			/>
		</div>
	</div>
);

const ProductImageGalleryDesktop = ({ gallery }: ProductImageGalleryDesktopProps) => {
	return (
		<div className="grid grid-cols-2 gap-5">
			{gallery.length > 0 ? (
				gallery.map(({ refKey, src, alt }) => (
					<GalleryItem
						key={refKey}
						image={{
							src,
							alt,
						}}
					/>
				))
			) : (
				<GalleryItem
					image={{
						src: ILLUSTRATIONS.PLACEHOLDERS.PRODUCT,
						alt: "Product Image Placeholder",
					}}
				/>
			)}
		</div>
	);
};

export { ProductImageGalleryDesktop };
