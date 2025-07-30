"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

import { SearchResultsFiltersContent } from "@/components/search/results-view/filters-content";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

const SearchResultsFiltersMobile = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Filter />
				<span>Filters</span>
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="w-[300px]" closeClassName="hidden">
					<SheetHeader className="sr-only">
						<SheetTitle>Filters Mobile</SheetTitle>
						<SheetDescription>Filters Mobile</SheetDescription>
					</SheetHeader>
					<ScrollArea className="h-full">
						<div className="p-5">
							<SearchResultsFiltersContent />
						</div>
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</>
	);
};

export { SearchResultsFiltersMobile };
