"use client";

import type { ProductImage } from "@/types/domain.types";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ILLUSTRATIONS } from "@/constants/media";

import { cn } from "@/lib/utils/general/cn";

type ProductImageGalleryMobileProps = {
	gallery: ProductImage[];
	loop?: boolean;
};

const GallerySlider = ({ slides, loop = false }: { slides: React.ReactNode[]; loop?: boolean }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop });
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};

		setScrollSnaps(emblaApi.scrollSnapList());
		onSelect();

		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", () => {
			setScrollSnaps(emblaApi.scrollSnapList());
			onSelect();
		});

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	return (
		<div className="relative">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{slides.map((slide, idx) => (
						<div key={idx} className="min-w-0 flex-[0_0_100%]">
							{slide}
						</div>
					))}
				</div>
			</div>
			<div className="mt-4 flex justify-center gap-2">
				{scrollSnaps.map((_, idx) => (
					<button
						key={idx}
						className={cn(
							"size-2 rounded-full",
							idx === selectedIndex ? "bg-primary-600" : "bg-neutral-200"
						)}
						onClick={() => emblaApi?.scrollTo(idx)}
					/>
				))}
			</div>
		</div>
	);
};

const GallerySlide = ({ image: { src, alt } }: { image: Omit<ProductImage, "refKey"> }) => {
	return (
		<div className="w-full">
			<div className="flex aspect-square items-center justify-center overflow-hidden bg-neutral-50">
				<div className="flex items-center justify-center">
					<Image
						src={src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT}
						alt={alt ?? ""}
						width={400}
						height={400}
					/>
				</div>
			</div>
		</div>
	);
};

const ProductImageGalleryMobile = ({ gallery, loop }: ProductImageGalleryMobileProps) => {
	return (
		<GallerySlider
			loop={loop}
			slides={
				gallery.length > 0
					? gallery.map(({ refKey, src, alt }) => (
							<GallerySlide key={refKey} image={{ src, alt }} />
						))
					: [
							<GallerySlide
								key={"product_placeholder_image"}
								image={{
									src: ILLUSTRATIONS.PLACEHOLDERS.PRODUCT,
									alt: "Product Image Placeholder",
								}}
							/>,
						]
			}
		/>
	);
};

export { ProductImageGalleryMobile };
