import { defineQuery } from "next-sanity";
import { MediaImage } from "@/lib/queries/sanity/media";

const ProductSKU = `
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

const ProductSlugs = defineQuery(`
    *[_type == "product"]{ "slug": slug.current }[0...$limit]
`);

const Product = defineQuery(`
    *[_type == "product" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        "id": _id,
        title,
        "slug": slug.current,
        description,
        hasVariants,
        "sku": sku->{ ${ProductSKU} },
        "brand": brand->{
            "id": _id,
            title,
            "slug": slug.current
        },
        "taxon": taxon->{
            "id": _id,
            title,
            "slug": slug.current,
            isLeaf
        },
        "options": select(
            defined(options) => options[]{
                "refKey": _key,
                name,
                values
            },
            []
        ),
        "variants": select(
            defined(variants) => variants[]{
                "refKey": _key,
                variantKey,
                "sku": sku->{ ${ProductSKU} },
                "gallery":  select(
                    defined(gallery) => gallery[]{ ${MediaImage} },
                    []
                ),
            },
            []
        ),
        "gallery":  select(
            defined(gallery) => gallery[]{ ${MediaImage} },
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

export { ProductSlugs, Product };
