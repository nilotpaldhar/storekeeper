import { useQuery } from "@tanstack/react-query";

import { userKeys } from "@/constants/tanstack-query-keys";

import { getCurrentUser } from "@/lib/requests/user";

const useCurrentUser = () => {
	return useQuery({
		queryKey: userKeys.current,
		queryFn: getCurrentUser,
	});
};

export { useCurrentUser };
