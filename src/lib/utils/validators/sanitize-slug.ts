/**
 * Sanitizes a slug:
 * - Converts to lowercase
 * - Trims whitespace
 * - Replaces spaces and underscores with dashes
 * - Removes characters not a-z, 0-9, or dashes
 * - Removes multiple consecutive dashes
 * - Trims leading/trailing dashes
 */
const sanitizeSlug = (slug: string): string => {
	return slug
		.toLowerCase()
		.trim()
		.replace(/[_\s]+/g, "-") // Replace spaces and underscores with dashes
		.replace(/[^a-z0-9-]/g, "") // Remove invalid characters
		.replace(/--+/g, "-") // Collapse multiple dashes
		.replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes
};

export { sanitizeSlug };
