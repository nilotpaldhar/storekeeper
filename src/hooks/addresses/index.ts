import { useMutation } from "@tanstack/react-query";

import { createAddress } from "@/lib/requests/addresses";

const useCreateAddress = () => {
	return useMutation({
		mutationFn: createAddress,
	});
};

export { useCreateAddress };
