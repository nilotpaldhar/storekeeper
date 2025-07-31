"use client";

import type { ProductCollectionLayout } from "@/types/ui.types";

import { type LucideIcon, Grid2X2, ListIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/general/cn";

type SearchResultsLayoutSwitchProps = {
	activeLayout: ProductCollectionLayout;
	onChange?: (layout: ProductCollectionLayout) => void;
};

const layouts: { type: ProductCollectionLayout; icon: LucideIcon; label: string }[] = [
	{ type: "list", icon: ListIcon, label: "Switch to List view" },
	{ type: "grid", icon: Grid2X2, label: "Switch to Grid view" },
];

const SearchResultsLayoutSwitch = ({ activeLayout, onChange }: SearchResultsLayoutSwitchProps) => {
	return (
		<div className="flex items-center space-x-3">
			{layouts.map(({ type, icon: Icon, label }) => {
				const isActive = activeLayout === type;
				return (
					<Button
						key={type}
						variant="light-ghost"
						size="icon"
						aria-pressed={isActive}
						onClick={() => onChange?.(type)}
						className={cn(
							"size-max",
							isActive
								? "text-neutral-900 hover:text-neutral-900"
								: "text-neutral-400 hover:text-neutral-400"
						)}
					>
						<Icon size={16} />
						<span className="sr-only">{label}</span>
					</Button>
				);
			})}
		</div>
	);
};

export { SearchResultsLayoutSwitch };
