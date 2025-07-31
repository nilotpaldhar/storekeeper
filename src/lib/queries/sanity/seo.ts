import { defineQuery } from "next-sanity";

const SeoFieldsFragment = `
    metaTitle,
    metaDesc,
    shareTitle,
    shareDesc,
    "shareGraphic": shareGraphic.asset->url
`;

const GlobalSeo = defineQuery(`
    *[_type == "seoSettings"][0] {
        metaTitle,
        metaDesc,
        shareDesc,
        shareTitle,
        twitterCardType,
        twitterUsername,
        metaRobotsNoindex,
        metaRobotsNofollow,
        "favicon": favicon.asset->url,
        "touchIcon": touchIcon.asset->url,
        "shareGraphic": shareGraphic.asset->url,
        "faviconLegacy": faviconLegacy.asset->url
    }
`);

const StaticPageSeo = defineQuery(`
    *[_type == "page" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        seo { ${SeoFieldsFragment} }
    }
`);

const NotFoundPageSeo = defineQuery(`
    *[_type == "notFoundPage"] | order(_updatedAt desc) [0] {
        seo { ${SeoFieldsFragment} }
    }
`);

const HomePageSeo = defineQuery(`
    *[_type == "homePage"] | order(_updatedAt desc) [0] {
        seo { ${SeoFieldsFragment} }
    }
`);

const ProductSeo = defineQuery(`
    *[_type == "product" && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        seo { ${SeoFieldsFragment} }
    }
`);

const CategorySeo = defineQuery(`
    *[_type in ["taxonomy", "taxon"] && slug.current ==  $slug] | order(_updatedAt desc) [0] {
        seo { ${SeoFieldsFragment} }
    }
`);

export { GlobalSeo, StaticPageSeo, NotFoundPageSeo, ProductSeo, HomePageSeo, CategorySeo };
