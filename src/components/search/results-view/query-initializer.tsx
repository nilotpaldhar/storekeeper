"use client";

import { useEffect, useRef } from "react";
import { useSearchBox } from "react-instantsearch";

// query-initializer.tsx
const SearchResultsQueryInitializer = ({ query }: { query: string }) => {
	const initialized = useRef(false);
	const { query: currentQuery, refine } = useSearchBox();

	useEffect(() => {
		if (!initialized.current && query !== currentQuery) {
			refine(query);
			initialized.current = true;
		}
	}, [query, currentQuery, refine]);

	return null;
};

export { SearchResultsQueryInitializer };
