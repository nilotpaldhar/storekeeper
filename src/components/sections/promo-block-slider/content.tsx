import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PromoBlock } from "@/types/domain.types";

import { Button } from "@/components/ui/button";

import { removeLeadingSlash } from "@/lib/utils/general/remove-leading-slash";

type PromoBlockContentProps = {
	title: PromoBlock["title"];
	description: PromoBlock["description"];
	price: PromoBlock["price"];
	link: PromoBlock["link"];
	className?: string;
};

const resolveHrefByResourceType = ({
	resourceType,
	slug,
}: {
	resourceType: "page" | "product" | "taxonomy" | "taxon" | null;
	slug: string | null;
}): string => {
	const hrefWithoutLeadingSlash = slug ? removeLeadingSlash(slug) : "#";

	if (resourceType === "page") {
		return hrefWithoutLeadingSlash;
	}

	if (resourceType === "product") {
		return `products/${hrefWithoutLeadingSlash}`;
	}

	if (resourceType === "taxonomy" || resourceType === "taxon") {
		return `categories/${hrefWithoutLeadingSlash}`;
	}

	return hrefWithoutLeadingSlash;
};

const PromoBlockContent = ({
	title,
	description,
	price,
	link,
	className,
}: PromoBlockContentProps) => {
	const resolvedHref = resolveHrefByResourceType({
		resourceType: link.resource?.type ?? null,
		slug: link.resource?.slug ?? null,
	});

	return (
		<div className={className}>
			<div className="flex flex-col space-y-4">
				<h1 className="text-center text-2xl !leading-normal font-black tracking-wider sm:text-3xl lg:text-left xl:text-4xl">
					{title}
				</h1>
				{description ? (
					<p className="hidden text-center text-sm leading-relaxed font-normal lg:block lg:text-left lg:text-base">
						{description}
					</p>
				) : null}
			</div>
			<div className="mt-6 flex flex-col px-14 sm:flex-row sm:items-center sm:justify-center sm:px-0 lg:justify-start">
				<div className="flex items-end justify-center space-x-1 sm:order-2 sm:ml-6">
					<span className="transform text-xs leading-none font-light lg:-translate-y-1">
						{price.label}
					</span>
					<span className="text-primary-600 text-2xl leading-none font-black lg:text-3xl">
						${price.amount}
					</span>
				</div>
				<Button className="mt-4 px-4 sm:order-1 sm:mt-0 lg:px-8" asChild>
					<Link href={`/${resolvedHref}`} target="_blank" rel="noopener noreferrer">
						<ArrowRight />
						<span>{link.label ?? "Discover Now"}</span>
					</Link>
				</Button>
			</div>
		</div>
	);
};

export { PromoBlockContent };
