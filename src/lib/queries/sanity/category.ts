import { defineQuery } from "next-sanity";

const CategorySlugsQuery = defineQuery(`
    *[_type in ["taxonomy", "taxon"]]{ "slug": slug.current }[0...$limit]
`);

const CategoryQuery = defineQuery(`
    *[_type in ["taxonomy", "taxon"] && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        "type": _type,
        "id": _id,
        title,
        "slug": slug.current,
    }
`);

export { CategorySlugsQuery, CategoryQuery };
