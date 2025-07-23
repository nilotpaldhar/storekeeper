import { MediaImageFragment } from "@/lib/queries/sanity/media";

const CollectionSummaryFragment = `
    "id": _id,
    title,
    "slug": slug.current,
    description,
    thumbnail { ${MediaImageFragment} }
`;

export { CollectionSummaryFragment };
