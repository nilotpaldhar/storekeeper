import { type SchemaTypeDefinition } from "sanity";

import { seo } from "@/sanity/schemas/objects/seo";
import { page } from "@/sanity/schemas/documents/page";
import { homePage } from "@/sanity/schemas/documents/home-page";
import { notFoundPage } from "@/sanity/schemas/documents/not-found-page";

const schema: { types: SchemaTypeDefinition[] } = {
	types: [seo, page, homePage, notFoundPage],
};

export { schema };
