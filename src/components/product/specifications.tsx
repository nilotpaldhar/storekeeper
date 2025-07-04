import { ProductSpecification } from "@/types/domain.types";

const ProductSpecifications = ({ specifications }: { specifications: ProductSpecification[] }) => {
	return (
		<dl className="grid grid-cols-2 gap-8">
			{specifications.map(({ refKey, label, value }) => (
				<div key={refKey} className="border-b border-neutral-200 pb-2">
					<dt className="text-xs leading-none font-normal text-neutral-400">{label}</dt>
					<dd className="pt-1 text-sm leading-relaxed font-normal">{value}</dd>
				</div>
			))}
		</dl>
	);
};

export { ProductSpecifications };
