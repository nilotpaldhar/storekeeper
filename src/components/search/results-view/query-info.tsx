"use client";

const SearchResultsQueryInfo = ({ query }: { query: string }) => {
	return (
		<div className="flex flex-wrap gap-1 text-base">
			{query ? (
				<>
					<span>Showing results for</span>
					<strong>&quot;{query}&quot;</strong>
				</>
			) : (
				<span>Showing all products</span>
			)}
		</div>
	);
};

export { SearchResultsQueryInfo };
