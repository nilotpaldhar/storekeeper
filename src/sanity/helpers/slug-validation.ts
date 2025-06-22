import { SlugRule, SlugValue } from "sanity";

/**
 * Reusable slug validation rule that:
 * - Requires the slug to exist
 * - Ensures `slug.current` is a string
 * - Disallows forward slashes ("/") in the slug value
 *
 * Use this in schemas where slugs must be flat (e.g., no nested paths)
 */
const noSlashSlugValidation = (rule: SlugRule) =>
	rule
		.required() // Ensure the slug field is present
		.custom((slug?: SlugValue) => {
			// Slug object or slug.current is missing
			if (!slug?.current) return "Slug is required";

			// Slug must be a string
			if (typeof slug.current !== "string") return "Slug must be a string";

			// Disallow "/" in slug (avoids breaking Next.js routes)
			if (slug.current.includes("/")) {
				return 'Slug cannot contain slashes ("/"). Use hyphens instead.';
			}

			return true;
		});

export { noSlashSlugValidation };
