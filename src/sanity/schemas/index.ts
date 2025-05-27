import { type SchemaTypeDefinition } from "sanity";

// Object Types (used as field subtypes)
import { seo } from "@/sanity/schemas/objects/seo";
import { navLink } from "@/sanity/schemas/objects/nav-link";
import { navPage } from "@/sanity/schemas/objects/nav-page";
import { navDropdown } from "@/sanity/schemas/objects/nav-dropdown";

// Document Types – Content Pages
import { page } from "@/sanity/schemas/documents/page";
import { homePage } from "@/sanity/schemas/documents/home-page";
import { notFoundPage } from "@/sanity/schemas/documents/not-found-page";

// Document Types – Global Settings
import { generalSettings } from "@/sanity/schemas/documents/settings-general";
import { headerSettings } from "@/sanity/schemas/documents/settings-header";
import { footerSettings } from "@/sanity/schemas/documents/settings-footer";
import { seoSettings } from "@/sanity/schemas/documents/settings-seo";
import { socialSettings } from "@/sanity/schemas/documents/settings-social";

// Document Types – Navigation
import { menu } from "@/sanity/schemas/documents/menu";

const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Object Types
		seo,
		navLink,
		navPage,
		navDropdown,

		// Navigation
		menu,

		// Pages
		page,
		homePage,
		notFoundPage,

		// Global Settings
		generalSettings,
		headerSettings,
		footerSettings,
		seoSettings,
		socialSettings,
	],
};

export { schema };
