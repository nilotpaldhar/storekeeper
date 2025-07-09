"use client";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
	const defaultOptions = {
		queries: { staleTime: Infinity, refetchInterval: 0 },
	};

	const [queryClient] = useState(
		() => new QueryClient({ defaultOptions, queryCache: new QueryCache() })
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools buttonPosition="bottom-right" />
			{children}
		</QueryClientProvider>
	);
};

export { TanstackQueryProvider };
