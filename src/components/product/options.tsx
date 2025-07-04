import type { ProductOption } from "@/types/domain.types";

import { Label } from "@/components/ui/label";
import { Block, BlockTitle, BlockContent } from "@/components/ui/block";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ProductOptionsProps = {
	options: ProductOption[];
};

const ProductOptions = ({ options }: ProductOptionsProps) => {
	return (
		<div className="flex flex-col space-y-6">
			{options.map((option) => (
				<Block key={option.refKey} className="flex flex-row items-center space-y-0 space-x-6">
					<BlockTitle className="w-28">{option.name}</BlockTitle>
					<BlockContent>
						{option.values.length > 0 ? (
							<RadioGroup defaultValue={option.values.at(0)}>
								{option.values.map((val) => (
									<div key={val} className="flex items-center gap-3">
										<RadioGroupItem id={val} value={val} />
										<Label htmlFor={val} className="capitalize">
											{val}
										</Label>
									</div>
								))}
							</RadioGroup>
						) : null}
					</BlockContent>
				</Block>
			))}
		</div>
	);
};

export { ProductOptions };
