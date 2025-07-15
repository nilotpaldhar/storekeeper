import type { ProductImage } from "@/types/domain.types";

import {
	ImageGalleryDesktop,
	ImageGalleryMobile,
} from "@/components/product/overview/image-gallery";
import { RatingSummary } from "@/components/product/overview/rating-summary";
import { ProductSharePopover } from "@/components/product/overview/share-popover";

const GallerySection = ({
	gallery,
	title,
	shareUrl,
}: {
	gallery: ProductImage[];
	title: string;
	shareUrl: string;
}) => (
	<>
		<div className="relative md:hidden">
			<ImageGalleryMobile gallery={gallery} />
			<div className="absolute bottom-12 left-0 z-50 w-full md:hidden">
				<div className="flex justify-between px-4 py-2">
					<RatingSummary className="rounded-full border-transparent bg-white" compact />
					<ProductSharePopover title={title} url={shareUrl} side="top" align="end" />
				</div>
			</div>
		</div>
		<div className="hidden md:block">
			<ImageGalleryDesktop gallery={gallery} />
		</div>
	</>
);

export { GallerySection };
