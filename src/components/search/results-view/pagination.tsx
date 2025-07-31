"use client";

import { useInstantSearch, usePagination } from "react-instantsearch";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const SearchResultsPagination = () => {
	const { pages, currentRefinement, isFirstPage, isLastPage, refine, nbPages } = usePagination();
	const { status } = useInstantSearch();

	if (status === "loading" || status === "error") return null;
	if (nbPages <= 1) return null;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => refine(currentRefinement - 1)}
						aria-disabled={isFirstPage}
						className={isFirstPage ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>

				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink onClick={() => refine(page)} isActive={currentRefinement === page}>
							{page + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={() => refine(currentRefinement + 1)}
						aria-disabled={isLastPage}
						className={isLastPage ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export { SearchResultsPagination };
