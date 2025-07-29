"use client";

import { useInstantSearch } from "react-instantsearch";

type SearchResultsEmptyBoundaryProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	hideChildren?: boolean;
};

const SearchResultsEmptyBoundary = ({
	children,
	fallback = null,
	hideChildren = true,
}: SearchResultsEmptyBoundaryProps) => {
	const { results } = useInstantSearch();
	const hitCount = results?.nbHits ?? 0;

	if (!results.__isArtificial && hitCount === 0) {
		return (
			<>
				{fallback}
				{hideChildren ? <div hidden>{children}</div> : null}
			</>
		);
	}

	return <>{children}</>;
};

export { SearchResultsEmptyBoundary };
