import { defineQuery } from "next-sanity";

import { MediaImageFragment } from "@/lib/queries/sanity/media";

const ProductSKUFragment = `
    "id": _id,
    code,
    name,
    description,
    imageUrl,
    piecesPerPack,
    weight,
    unitOfWeight,
    hsTariffNumber
`;

const ProductTaxonomyFragment = `
    "id": _id,
    title,
    "slug": slug.current
`;

const ProductTaxonFragment = `
    "id": _id,
    title,
    "slug": slug.current,
    isLeaf
`;

const ProductBrandFragment = `
    "id": _id,
    title,
    "slug": slug.current
`;

const ProductOptionFragment = `
    "refKey": _key,
    name,
    values
`;

const ProductVariantFragment = `
    "refKey": _key,
    variantKey,
    "sku": sku->{ ${ProductSKUFragment} },
    "gallery":  select(
        defined(gallery) => gallery[]{ ${MediaImageFragment} },
        []
    )
`;

const ProductSummaryFragment = `
    "id": _id,
    title,
    "slug": slug.current,
    description,
    hasVariants,
    "sku": sku->{ ${ProductSKUFragment} },
    "taxonomy":  taxon->taxonomy->{  ${ProductTaxonomyFragment} },
    "taxon": taxon->{ ${ProductTaxonFragment} },
    "brand": brand->{ ${ProductBrandFragment} },
    "gallery":  select(
        defined(gallery) => gallery[]{ ${MediaImageFragment} },
        []
    ),
    "variants": select(
        defined(variants) => variants[]{ ${ProductVariantFragment} },
        []
    ),
`;

const ProductSlugsQuery = defineQuery(`
    *[_type == "product"]{ "slug": slug.current }[0...$limit]
`);

const ProductQuery = defineQuery(`
    *[_type == "product" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        "id": _id,
        title,
        "slug": slug.current,
        description,
        hasVariants,
        "sku": sku->{ ${ProductSKUFragment} },
        "brand": brand->{
            "id": _id,
            title,
            "slug": slug.current
        },
        "taxon": taxon->{ ${ProductTaxonFragment} },
        "options": select(
            defined(options) => options[]{ ${ProductOptionFragment} },
            []
        ),
        "variants": select(
            defined(variants) => variants[]{ ${ProductVariantFragment} },
            []
        ),
        "gallery":  select(
            defined(gallery) => gallery[]{ ${MediaImageFragment} },
            []
        ),
        "specifications": select(
            defined(gallery) => specifications[]{
                "refKey": _key,
                label,
                value
            },
            []
        )
    }
`);

const ProductSummaryQuery = defineQuery(`
    *[_type == "product" && _id ==  $id] | order(_updatedAt desc) [0] {
        ${ProductSummaryFragment}
    }
`);

const RelatedProductsQuery = defineQuery(`
    *[_type == "product" && _id ==  $id] | order(_updatedAt desc) [0] {
        "relatedProducts": relatedProducts[]->{ ${ProductSummaryFragment} }
    }
`);

const ProductBySkuCodeQuery = defineQuery(`
    *[_type == "product" && ( sku->code == $skuCode || count(variants[sku->code == $skuCode]) > 0 )][0]{
        ${ProductSummaryFragment}
    }
`);

const SyncPublishedProductsQuery = defineQuery(`
	*[ _type == "product" && !(_id in path('drafts.**'))] {
		${ProductSummaryFragment}
	}
`);

export {
	ProductSummaryFragment,
	ProductSlugsQuery,
	ProductQuery,
	ProductSummaryQuery,
	RelatedProductsQuery,
	ProductBySkuCodeQuery,
	SyncPublishedProductsQuery,
};
