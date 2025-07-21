"use client";

import Image from "next/image";

import { ILLUSTRATIONS } from "@/constants/media";
import { PromoBlock } from "@/types/domain.types";

import { PromoBlockContent } from "@/components/sections/promo-block-slider/content";
import { Container } from "@/components/ui/container";

import { cn } from "@/lib/utils/general/cn";

type PromoBlockSlideProps = {
	data: PromoBlock;
};

const PromoBlockSlide = ({ data }: PromoBlockSlideProps) => {
	const { title, description, price, contentAlignment, thumbnail, backdrop, link } = data;

	return (
		<article className="relative h-[600px] overflow-hidden">
			<div className="relative z-10 flex h-full items-center">
				<Container className="flex flex-col items-center lg:flex-row">
					<div
						className={cn(
							"order-2 mt-4 max-w-xl lg:mt-0 lg:max-w-md xl:max-w-xl",
							contentAlignment === "left" && "lg:order-1",
							contentAlignment === "right" && "lg:order-2 lg:ml-auto"
						)}
					>
						<PromoBlockContent title={title} description={description} price={price} link={link} />
					</div>
					<div
						className={cn(
							"order-1 max-w-xs shrink-0 md:max-w-sm lg:max-w-md xl:max-w-xl 2xl:max-w-xl",
							contentAlignment === "left" && "lg:order-2 lg:ml-auto",
							contentAlignment === "right" && "lg:order-1"
						)}
					>
						<Image
							priority
							width={600}
							height={600}
							alt={thumbnail.alt ?? title}
							src={thumbnail.src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT}
							sizes="(min-width: 1200px) 576px, (min-width: 1000px) 448px, (min-width: 780px) 384px, (min-width: 460px) 320px, calc(14.29vw + 225px)"
						/>
					</div>
				</Container>
			</div>
			{backdrop && backdrop.src ? (
				<Image
					fill
					priority
					src={backdrop.src}
					alt={backdrop.alt ?? "Background Image"}
					className="object-cover"
					sizes="(min-width: 2280px) 2260px, (min-width: 1600px) 1600px, (min-width: 1420px) calc(25vw + 1065px), (min-width: 1220px) 1220px, (min-width: 440px) 440px, calc(16.67vw + 250px)"
				/>
			) : (
				<div className="absolute inset-0 h-full w-full bg-gray-50" />
			)}
		</article>
	);
};

export { PromoBlockSlide };

{
	/* <Container className="grid grid-cols-2 gap-5">
	<div className="">
		<PromoBlockContent title={data.title} description={data.description} price={data.price} />
	</div>
	<div className="hidden bg-pink-300">Col 2</div>
</Container>; */
}
