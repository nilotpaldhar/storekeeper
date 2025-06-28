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

const NotFoundPage = defineQuery(`
    *[_type == "notFoundPage"] | order(_updatedAt desc) [0] {
        title,
        description
    }
`);

export { StaticPageSlugs, StaticPage, NotFoundPage };
