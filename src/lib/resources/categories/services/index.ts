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
 * Query to get a taxonomy by its slug.
 */
const TaxonomyBySlug = defineQuery(`
	*[_type == "taxonomy" && slug.current == $slug][0]{
		"id": _id,
		title,
		"slug": slug.current
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
 * Builds the breadcrumb trail for a given taxonomy/taxon slug.
 * Uses flat URL structure: /categories/:slug for each level.
 */
const buildCategoryBreadcrumb = async ({
	slug,
	includeRoot = true,
}: {
	slug: string;
	includeRoot?: boolean;
}): Promise<ProductBreadcrumb> => {
	const sanityClient = getSanityClient();
	const breadcrumb: ProductBreadcrumb = [];

	try {
		// Optionally add Home
		if (includeRoot) {
			breadcrumb.push({ id: "root", label: "Home", path: "/" });
		}

		// Try finding a taxon first
		const taxon = await sanityClient.fetch(TaxonBySlug, { slug });
		if (taxon) {
			const taxonomy = taxon.taxonomy;
			const taxonHierarchy = await resolveTaxonHierarchy({ taxonId: taxon.id });

			if (taxonomy) {
				breadcrumb.push({
					id: taxonomy.id,
					label: taxonomy.title ?? "",
					path: `/categories/${taxonomy.slug}`,
				});
			}

			taxonHierarchy.forEach((node) => {
				breadcrumb.push({
					id: node.id,
					label: node.title,
					path: `/categories/${node.slug}`,
				});
			});

			return breadcrumb;
		}

		// If no taxon found, try taxonomy
		const taxonomy = await sanityClient.fetch(TaxonomyBySlug, { slug });
		if (taxonomy) {
			breadcrumb.push({
				id: taxonomy.id,
				label: taxonomy.title ?? "",
				path: `/categories/${taxonomy.slug}`,
			});
			return breadcrumb;
		}

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
