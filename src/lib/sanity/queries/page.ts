import { defineQuery } from "next-sanity";

const StaticPageSlugs = defineQuery(`
    *[_type == "page"]{ "slug": slug.current }
`);

const StaticPage = defineQuery(`
    *[_type == "page" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        "type": _type,
        "id": _id,
        title,
        "content": pageContent
    }
`);

export { StaticPageSlugs, StaticPage };
