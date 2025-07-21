import { defineQuery } from "next-sanity";

import { MediaImageFragment } from "@/lib/queries/sanity/media";

const PromoBlockFragment = `
    "id": _id,
    title,
    description,
    contentAlignment,
    price,
    thumbnail { ${MediaImageFragment} },
    backdrop { ${MediaImageFragment} },
    link {
        label,
        resource->{
            "type": _type,
            "slug": slug.current
        }
    }
`;

const StaticPageSlugsQuery = defineQuery(`
    *[_type == "page"]{ "slug": slug.current }
`);

const StaticPageQuery = defineQuery(`
    *[_type == "page" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        "type": _type,
        "id": _id,
        title,
        "content": pageContent
    }
`);

const NotFoundPageQuery = defineQuery(`
    *[_type == "notFoundPage"] | order(_updatedAt desc) [0] {
        title,
        description
    }
`);

const HomePageQuery = defineQuery(`
    *[_type == "homePage"] | order(_updatedAt desc) [0] {
        "type": _type,
        "id": _id,
        title,
        promoSection {
            hidden,
            "items": items[]->{ ${PromoBlockFragment} }
        }
    }
`);

export { StaticPageSlugsQuery, StaticPageQuery, NotFoundPageQuery, HomePageQuery };
