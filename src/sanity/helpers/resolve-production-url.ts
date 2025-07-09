import type { ResolveProductionUrlContext, SanityDocumentLike, Slug } from "sanity";

import { env } from "@/lib/config/env";

// Extend base Sanity document type to optionally include a slug
type SluggedDocument = SanityDocumentLike & {
	slug?: Slug;
};

// Base URL for your Next.js site
const basePreviewUrl = env.NEXT_PUBLIC_SITE_URL;

// Secure token to enable preview mode (should match your Next.js preview route)
const token = env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN;

// Supported document types that should trigger preview mode
const previewDocTypes = ["page", "product"];

let rootUrl: URL | null = null;

try {
	rootUrl = new URL(basePreviewUrl);
} catch (err) {
	console.error("Invalid productionUrl", err);
}

/**
 * Returns the document slug string based on its type.
 */
const getDocSlug = ({ docType, slug }: { docType: string; slug?: Slug }): string => {
	if (docType === "page" || docType === "product") {
		return slug?.current ?? "";
	}
	return "";
};

/**
 * Generates a preview URL for supported document types.
 * Used by Sanity Studio to open a live preview of a document.
 */
const resolveProductionUrl = async (
	prev: string | undefined,
	{ document }: ResolveProductionUrlContext
): Promise<string | undefined> => {
	const docType = document?._type ?? "";
	const { slug } = document as SluggedDocument;

	// Skip preview if base URL is invalid or unsupported type
	if (!rootUrl || !previewDocTypes.includes(docType)) return prev;

	const docSlug = getDocSlug({ docType, slug });

	const searchParams = new URLSearchParams();
	searchParams.set("type", docType);
	if (docSlug) searchParams.set("slug", docSlug);
	if (token) searchParams.set("token", token);

	return `${rootUrl.origin}/api/preview?${searchParams.toString()}`;
};

export { resolveProductionUrl };
