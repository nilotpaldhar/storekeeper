import { useMutation } from "@tanstack/react-query";

import { syncSkusFromCommerceLayer, indexProductsToAlgolia } from "@/lib/requests/sync-api";

const useSyncSkusFromCommerceLayer = () => {
	return useMutation({
		mutationFn: syncSkusFromCommerceLayer,
	});
};

const useIndexProductsToAlgolia = () => {
	return useMutation({
		mutationFn: indexProductsToAlgolia,
	});
};

export { useSyncSkusFromCommerceLayer, useIndexProductsToAlgolia };
