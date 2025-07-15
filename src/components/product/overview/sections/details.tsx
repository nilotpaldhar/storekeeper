import type { ProductSpecification } from "@/types/domain.types";

import { Specifications } from "@/components/product/overview/specifications";
import { Block, BlockContent, BlockTitle } from "@/components/ui/block";
import { CollapsibleText } from "@/components/ui/collapsible-text";

const DetailsSection = ({
	description,
	specifications,
	skuCode,
}: {
	description: string | null;
	specifications: ProductSpecification[];
	skuCode: string;
}) => (
	<>
		{description && (
			<Block className="pb-8">
				<BlockTitle>Product Details</BlockTitle>
				<BlockContent>
					<CollapsibleText text={description} previewLength={300} className="leading-relaxed" />
				</BlockContent>
			</Block>
		)}

		{specifications.length > 0 && (
			<Block className="space-y-4 pb-6">
				<BlockTitle>Specifications</BlockTitle>
				<BlockContent>
					<Specifications specifications={specifications} />
				</BlockContent>
			</Block>
		)}

		<Block className="flex-row flex-wrap items-center gap-3 space-y-0">
			<BlockTitle className="whitespace-nowrap">Product Code:</BlockTitle>
			<BlockContent>
				<p className="text-sm leading-none font-normal whitespace-nowrap">{skuCode}</p>
			</BlockContent>
		</Block>
	</>
);

export { DetailsSection };
