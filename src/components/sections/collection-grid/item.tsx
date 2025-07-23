import type { CollectionSummary } from "@/types/domain.types";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ILLUSTRATIONS } from "@/constants/media";

type CollectionItemProps = {
	summary: CollectionSummary;
};

const CollectionItem = ({ summary }: CollectionItemProps) => {
	const { title, slug, description, thumbnail } = summary;
	const imgSrc = thumbnail?.src ?? ILLUSTRATIONS.PLACEHOLDERS.COLLECTION_THUMBNAIL;
	const imgAlt = thumbnail?.alt ?? title;

	return (
		<article className="relative mx-auto flex aspect-video max-w-max items-center">
			<Image src={imgSrc} alt={imgAlt} width={400} height={200} />
			<div className="absolute top-2/4 left-0 z-10 max-w-max -translate-y-2/4 transform px-6 py-4">
				<div className="flex h-full flex-col justify-center space-y-2 lg:space-y-3">
					<h3 className="truncate overflow-hidden text-xs leading-tight font-normal text-neutral-500">
						{title}
					</h3>
					<p className="max-w-[20ch] text-sm leading-relaxed font-normal text-neutral-900">
						{description}
					</p>
					<Link
						href={`/collections/${slug}`}
						className="text-primary-600 hover:text-primary-500 flex max-w-max items-center space-x-1"
					>
						<span className="inline-block text-sm font-medium">Shop Now</span>
						<ArrowRightIcon size={12} />
					</Link>
				</div>
			</div>
		</article>
	);
};

export { CollectionItem };
