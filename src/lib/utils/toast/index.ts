import { toast } from "sonner";

/**
 * Shows a standard 'Feature Not Available Yet' notification.
 * Optionally accepts a custom feature name or extra description.
 */
const notifyFeatureUnavailable = ({
	featureName = "This feature",
	extraInfo,
}: {
	featureName: string;
	extraInfo?: string;
}) => {
	toast.info(`${featureName} is not available yet.`, {
		description: extraInfo ?? "We're working on it — check back soon or follow our updates.",
	});
};

export { notifyFeatureUnavailable };
