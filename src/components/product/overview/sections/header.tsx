import type { ProductBreadcrumb } from "@/types/domain.types";

import { NavigationTrail } from "@/components/navigation/navigation-trail";
import { ProductSharePopover } from "@/components/product/overview/share-popover";

const HeaderSection = ({
	breadcrumb,
	title,
	shareUrl,
}: {
	breadcrumb: ProductBreadcrumb;
	title: string;
	shareUrl: string;
}) => (
	<div className="hidden grid-cols-12 gap-8 md:grid">
		<div className="col-span-full lg:col-span-7">
			<div className="flex flex-wrap items-center justify-between space-x-4">
				<NavigationTrail breadcrumb={breadcrumb} />
				<ProductSharePopover title={title} url={shareUrl} />
			</div>
		</div>
	</div>
);

export { HeaderSection };
