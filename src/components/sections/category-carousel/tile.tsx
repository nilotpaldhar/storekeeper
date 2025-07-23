import type { MediaImage } from "@/types/domain.types";

import Image from "next/image";
import Link from "next/link";

import { ILLUSTRATIONS } from "@/constants/media";

import { cn } from "@/lib/utils/general/cn";

type CategoryTileProps = {
	title: string;
	slug: string;
	thumbnail: MediaImage;
};

const CategoryTile = ({ title, slug, thumbnail }: CategoryTileProps) => {
	const imgUrl = thumbnail.src ?? ILLUSTRATIONS.PLACEHOLDERS.CATEGORY;
	const imgAlt = thumbnail.alt ?? title;

	return (
		<div className="mx-4 my-2">
			<Link
				href={`/categories/${slug}`}
				className={cn(
					"flex w-full flex-col items-center overflow-hidden text-center text-neutral-900 hover:text-neutral-900"
				)}
			>
				<Image src={imgUrl} alt={imgAlt} width={130} height={130} className="mb-2 block" />
				<h3 className="w-full truncate px-2 text-sm font-medium" title={title}>
					{title}
				</h3>
			</Link>
		</div>
	);
};

export { CategoryTile };
