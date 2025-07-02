/**
 * Safely encodes any pathname + search as a callbackUrl.
 *
 * Example:
 *   buildCallbackUrl("/checkout?step=payment")
 *   -> "%2Fcheckout%3Fstep%3Dpayment"
 */
const buildCallbackUrl = ({
	pathname,
	searchParams,
}: {
	pathname: string;
	searchParams?: string;
}): string => {
	const fullPath =
		searchParams && searchParams.length > 0 ? `${pathname}?${searchParams}` : pathname;
	return encodeURIComponent(fullPath);
};

export { buildCallbackUrl };
