"use client";

import { XIcon } from "lucide-react";
import { Fragment } from "react";
import { useCurrentRefinements } from "react-instantsearch";

import { cn } from "@/lib/utils/general/cn";

const SearchResultsRefinements = ({ className }: { className?: string }) => {
	const { items, canRefine, refine } = useCurrentRefinements();

	if (items.length === 0) return null;

	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			{items.map((item) => (
				<Fragment key={item.attribute}>
					{item.refinements.map((refinement) => (
						<div
							key={refinement.label}
							className="flex items-center justify-center space-x-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1.5"
						>
							<span className="block text-xs font-normal">{refinement.label}</span>
							<button
								className="flex size-3.5 cursor-pointer items-center justify-center rounded-full text-neutral-900 hover:text-neutral-700"
								disabled={!canRefine}
								onClick={() => refine(refinement)}
							>
								<XIcon size={14} />
								<span className="sr-only">Remove</span>
							</button>
						</div>
					))}
				</Fragment>
			))}
		</div>
	);
};

export { SearchResultsRefinements };
