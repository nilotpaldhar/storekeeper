"use client";

import { useClearRefinements } from "react-instantsearch";

import { Button } from "@/components/ui/button";

const FiltersHeader = ({ title = "Filters" }: { title?: string }) => {
	const { canRefine, refine } = useClearRefinements();

	return (
		<div className="flex items-center justify-between border-b border-neutral-100 pb-6 text-base">
			<div className="font-semibold">{title}</div>
			<Button
				variant="primary-ghost"
				className="px-0"
				onClick={() => refine()}
				disabled={!canRefine}
			>
				Clear All
			</Button>
		</div>
	);
};

export { FiltersHeader };
