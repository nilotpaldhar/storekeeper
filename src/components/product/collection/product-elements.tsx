import type { ProductImage, ProductPrice } from "@/types/domain.types";

import Image from "next/image";

import { ILLUSTRATIONS } from "@/constants/media";

import { cn } from "@/lib/utils/general/cn";

const Title = ({ title, className }: { title: string; className?: string }) => {
	return (
		<h3 className={cn("line-clamp-1 text-sm font-medium", className)} title={title}>
			{title}
		</h3>
	);
};

const Description = ({ description, className }: { description: string; className?: string }) => {
	return <div className={cn("line-clamp-2 leading-relaxed", className)}>{description}</div>;
};

const Category = ({ category, className }: { category: string; className?: string }) => {
	return (
		<p className={cn("text-xs font-normal tracking-wide text-neutral-500", className)}>
			{category}
		</p>
	);
};

const Price = ({ price, className }: { price: ProductPrice | null; className?: string }) => {
	return (
		<div className={cn("text-sm font-medium", className)}>
			{price ? (
				<div className="flex items-center space-x-2">
					{price.formatted_compare_at_amount ? (
						<span className="font-normal text-neutral-500">
							<del className="line-through">{price.formatted_compare_at_amount}</del>
						</span>
					) : null}
					{price.formatted_amount ? (
						<span>
							<ins className="no-underline">{price.formatted_amount}</ins>
						</span>
					) : null}
				</div>
			) : (
				<span className="text-error-600">Price Unavailable</span>
			)}
		</div>
	);
};

const Thumbnail = ({
	title,
	image,
	className,
}: {
	title: string;
	image: ProductImage | null;
	className?: string;
}) => {
	return (
		<Image
			src={image?.src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT}
			alt={image?.alt ?? title}
			width={200}
			height={200}
			className={className}
		/>
	);
};

export { Title, Description, Category, Price, Thumbnail };
