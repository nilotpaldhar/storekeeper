"use client";

import { useHits } from "react-instantsearch";

const SearchResultsQueryInfo = ({ query }: { query: string }) => {
	const { hits } = useHits();
	const resultsCount = hits.length;

	return (
		<div className="flex flex-wrap gap-1 text-sm">
			{query ? (
				<>
					<span>Showing {resultsCount} results for</span>
					<strong>&quot;{query}&quot;</strong>
				</>
			) : (
				<span>Showing all {resultsCount} products</span>
			)}
		</div>
	);
};

export { SearchResultsQueryInfo };
