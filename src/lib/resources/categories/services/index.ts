import type { ProductBreadcrumb } from "@/types/domain.types";

import { defineQuery } from "next-sanity";

import { getSanityClient } from "@/lib/clients/sanity";
import { logEvent } from "@/lib/logging/log-event";

/**
 * A single taxon node used in the parent chain.
 */
type TaxonNode = {
	id: string;
	title: string;
	slug: string;
};

/**
 * Query to get a taxon by its ID, including its parent ID.
 */
const TaxonById = defineQuery(`
    *[_type == "taxon" && _id == $id][0]{
        "id": _id,
        title,
        "slug": slug.current,
        "parentId": parent->_id
    }
`);

/**
 * Query to get a taxon by its slug, including its taxonomy reference.
 */
const TaxonBySlug = defineQuery(`
    *[_type == "taxon" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        "id": _id,
        title,
        "slug": slug.current,
        "taxonomy": taxonomy->{
            "id": _id,  
            title,
            "slug": slug.current,
        }
    }
`);

/**
 * Recursively resolve a taxon's parent hierarchy.
 * Returns root -> child.
 */
const resolveTaxonHierarchy = async ({ taxonId }: { taxonId: string }): Promise<TaxonNode[]> => {
	const sanityClient = getSanityClient();

	const taxon = await sanityClient.fetch(TaxonById, { id: taxonId });
	if (!taxon) return [];

	let parentNodes: TaxonNode[] = [];
	if (taxon.parentId) parentNodes = await resolveTaxonHierarchy({ taxonId: taxon.parentId });
	parentNodes.push({ id: taxon.id, title: taxon.title ?? "", slug: taxon.slug ?? "" });

	return parentNodes;
};

/**
 * Builds the breadcrumb trail for a given taxon slug.
 * Uses flat URL structure: /categories/:slug for each level.
 */
const buildCategoryBreadcrumb = async ({
	taxonSlug,
	inludeRoot = true,
}: {
	taxonSlug: string;
	inludeRoot?: boolean;
}): Promise<ProductBreadcrumb> => {
	try {
		const sanityClient = getSanityClient();
		const breadcrumb: ProductBreadcrumb = [];

		// Fetch taxon by slug with its taxonomy
		const taxon = await sanityClient.fetch(TaxonBySlug, { slug: taxonSlug });
		if (!taxon) return breadcrumb;

		// Get full parent hierarchy
		const taxonHierarchy = await resolveTaxonHierarchy({ taxonId: taxon.id });

		// Get the taxonomy the taxon belongs to
		const taxonomy = taxon.taxonomy;

		// Optionally add Home link
		if (inludeRoot) {
			breadcrumb.push({
				id: "root",
				label: "Home",
				path: "/",
			});
		}

		// Add taxonomy link: /categories/:slug
		if (taxonomy) {
			breadcrumb.push({
				id: taxonomy.id,
				label: taxonomy.title ?? "",
				path: `/categories/${taxonomy.slug}`,
			});
		}

		// Add each taxon in hierarchy: /categories/:slug (flat path)
		taxonHierarchy.forEach((node) => {
			breadcrumb.push({
				id: node.id,
				label: node.title,
				path: `/categories/${node.slug}`,
			});
		});

		return breadcrumb;
	} catch (error) {
		logEvent({
			fn: "generateProductBreadcrumb",
			level: "error",
			event: "fail",
			error,
		});
		return [];
	}
};

export { buildCategoryBreadcrumb };
