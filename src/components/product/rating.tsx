import { Star } from "lucide-react";

const ProductRating = () => {
	return (
		<div className="flex items-center space-x-2.5 border border-neutral-200 px-3 py-1.5 text-sm leading-none">
			<div className="flex items-center space-x-1">
				<span className="font-bold">4.2</span>
				<Star size={12} className="text-yellow-400" />
			</div>
			<span role="separator" className="h-4 w-px bg-neutral-200" />
			<div>
				<span className="font-normal">47k Ratings</span>
			</div>
		</div>
	);
};

export { ProductRating };
