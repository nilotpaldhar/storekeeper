"use client";

import type { PromoBlock } from "@/types/domain.types";

import { PromoBlockSlide } from "@/components/sections/promo-block-slider/slide";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type PromoBlockSliderProps = {
	blocks: PromoBlock[];
};

const PromoBlockSlider = ({ blocks }: PromoBlockSliderProps) => {
	if (blocks.length === 0) return null;

	return (
		<Carousel className="max-w-full">
			<CarouselContent>
				{blocks.map((block) => (
					<CarouselItem key={block.id}>
						<PromoBlockSlide data={block} />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export { PromoBlockSlider };
