import { type SchemaTypeDefinition } from "sanity";

/* ============================================================================
 * OBJECT TYPES
 * These are reusable field structures used across documents
 * ========================================================================== */

// Media & SEO
import { seo } from "@/sanity/schemas/objects/seo";

// Navigation objects
import { navLink } from "@/sanity/schemas/objects/nav-link";
import { navPage } from "@/sanity/schemas/objects/nav-page";
import { navDropdown } from "@/sanity/schemas/objects/nav-dropdown";
import { navMegaDropdown } from "@/sanity/schemas/objects/nav-mega-dropdown";
import { navMegaDropdownColumn } from "@/sanity/schemas/objects/nav-mega-dropdown-column";

/* ============================================================================
 * DOCUMENT TYPES
 * These define the top-level content types used in the CMS
 * ========================================================================== */

// Pages
import { page } from "@/sanity/schemas/documents/page";
import { homePage } from "@/sanity/schemas/documents/home-page";
import { notFoundPage } from "@/sanity/schemas/documents/not-found-page";

// Navigation Menus
import { menu } from "@/sanity/schemas/documents/menu";

// Site Settings
import { generalSettings } from "@/sanity/schemas/documents/settings-general";
import { headerSettings } from "@/sanity/schemas/documents/settings-header";
import { footerSettings } from "@/sanity/schemas/documents/settings-footer";
import { seoSettings } from "@/sanity/schemas/documents/settings-seo";
import { socialSettings } from "@/sanity/schemas/documents/settings-social";

/* ============================================================================
 * FINAL SCHEMA EXPORT
 * This registers all document and object types with Sanity
 * ========================================================================== */
const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Object types (reusable)
		seo,
		navLink,
		navPage,
		navDropdown,
		navMegaDropdown,
		navMegaDropdownColumn,

		// Documents
		// Pages
		homePage,
		notFoundPage,
		page,

		// Navigation
		menu,

		// Settings
		generalSettings,
		headerSettings,
		footerSettings,
		seoSettings,
		socialSettings,
	],
};

export { schema };
