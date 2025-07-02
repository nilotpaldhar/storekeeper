import { usePathname, useSearchParams } from "next/navigation";
import { buildCallbackUrl } from "@/lib/utils/navigation/build-callback-url";

/**
 * Hook to generate a safe callbackUrl for the current page.
 *
 * Automatically includes query params if present.
 *
 * Wrap your component in <Suspense> if you use this,
 * since `useSearchParams` needs Suspense for hydration safety.
 */
const useCallbackUrl = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return buildCallbackUrl({
		pathname,
		searchParams: searchParams.toString(),
	});
};

export { useCallbackUrl };
