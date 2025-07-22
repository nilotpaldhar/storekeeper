"use client";

import type { HomePage } from "@/types/domain.types";

import { CategoryTile } from "@/components/sections/category-carousel/tile";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type CategoryCarouselProps = {
	items: HomePage["categorySection"]["items"];
};

const CategoryCarousel = ({ items }: CategoryCarouselProps) => {
	return (
		<Carousel className="mx-auto w-full px-4">
			<CarouselContent>
				{items.map((item) => (
					<CarouselItem key={item.id} className="xs:basis-1/2 basis-full md:basis-1/3 lg:basis-1/5">
						<CategoryTile title={item.title} slug={item.slug} thumbnail={item.thumbnail} />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export { CategoryCarousel };
