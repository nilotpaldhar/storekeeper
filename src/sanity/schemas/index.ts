import { type SchemaTypeDefinition } from "sanity";

import { seo } from "@/sanity/schemas/objects/seo";

import { page } from "@/sanity/schemas/documents/page";
import { homePage } from "@/sanity/schemas/documents/home-page";
import { notFoundPage } from "@/sanity/schemas/documents/not-found-page";

import { generalSettings } from "@/sanity/schemas/documents/settings-general";
import { seoSettings } from "@/sanity/schemas/documents/settings-seo";
import { socialSettings } from "@/sanity/schemas/documents/settings-social";

const schema: { types: SchemaTypeDefinition[] } = {
	types: [seo, page, homePage, notFoundPage, generalSettings, seoSettings, socialSettings],
};

export { schema };
