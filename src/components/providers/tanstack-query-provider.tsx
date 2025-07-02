"use client";

import { useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
