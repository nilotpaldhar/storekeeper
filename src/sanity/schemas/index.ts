import { type SchemaTypeDefinition } from "sanity";

/* ============================================================================
 * OBJECT TYPES
 * These are reusable field structures used across documents
 * ========================================================================== */

// Media & SEO
import { seo } from "@/sanity/schemas/objects/seo";
import { mediaImage } from "@/sanity/schemas/objects/media-image";

// Navigation objects
import { navLink } from "@/sanity/schemas/objects/nav-link";
import { navPage } from "@/sanity/schemas/objects/nav-page";
import { navProduct } from "@/sanity/schemas/objects/nav-product";
import { navTaxonomy } from "@/sanity/schemas/objects/nav-taxonomy";
import { navTaxon } from "@/sanity/schemas/objects/nav-taxon";
import { navDropdown } from "@/sanity/schemas/objects/nav-dropdown";
import { navMegaDropdown } from "@/sanity/schemas/objects/nav-mega-dropdown";
import { navMegaDropdownColumn } from "@/sanity/schemas/objects/nav-mega-dropdown-column";

// Product-related objects
import { productOption } from "@/sanity/schemas/objects/product-option";
import { productVariant } from "@/sanity/schemas/objects/product-variant";
import { productSpecification } from "@/sanity/schemas/objects/product-specification";

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

// Commerce / Product catalog
import { product } from "@/sanity/schemas/documents/product";
import { sku } from "@/sanity/schemas/documents/sku";
import { brand } from "@/sanity/schemas/documents/brand";

// Taxonomy system
import { taxonomy } from "@/sanity/schemas/documents/taxonomy";
import { taxon } from "@/sanity/schemas/documents/taxon";

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
		mediaImage,
		seo,
		navLink,
		navPage,
		navProduct,
		navTaxonomy,
		navTaxon,
		navDropdown,
		navMegaDropdown,
		navMegaDropdownColumn,
		productOption,
		productVariant,
		productSpecification,

		// Documents
		// Pages
		homePage,
		notFoundPage,
		page,

		// Navigation
		menu,

		// Taxonomy
		taxonomy,
		taxon,

		// Commerce
		product,
		sku,
		brand,

		// Settings
		generalSettings,
		headerSettings,
		footerSettings,
		seoSettings,
		socialSettings,
	],
};

export { schema };
