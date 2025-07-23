import { type SchemaTypeDefinition } from "sanity";

import { brand } from "@/sanity/schemas/documents/brand";
import { collection } from "@/sanity/schemas/documents/collection";
import { homePage } from "@/sanity/schemas/documents/home-page";
import { menu } from "@/sanity/schemas/documents/menu";
import { notFoundPage } from "@/sanity/schemas/documents/not-found-page";
import { page } from "@/sanity/schemas/documents/page";
import { product } from "@/sanity/schemas/documents/product";
import { promoBlock } from "@/sanity/schemas/documents/promo-block";
import { footerSettings } from "@/sanity/schemas/documents/settings-footer";
import { generalSettings } from "@/sanity/schemas/documents/settings-general";
import { headerSettings } from "@/sanity/schemas/documents/settings-header";
import { seoSettings } from "@/sanity/schemas/documents/settings-seo";
import { socialSettings } from "@/sanity/schemas/documents/settings-social";
import { sku } from "@/sanity/schemas/documents/sku";
import { taxon } from "@/sanity/schemas/documents/taxon";
import { taxonomy } from "@/sanity/schemas/documents/taxonomy";
import { mediaImage } from "@/sanity/schemas/objects/media-image";
import { navDropdown } from "@/sanity/schemas/objects/nav-dropdown";
import { navLink } from "@/sanity/schemas/objects/nav-link";
import { navMegaDropdown } from "@/sanity/schemas/objects/nav-mega-dropdown";
import { navMegaDropdownColumn } from "@/sanity/schemas/objects/nav-mega-dropdown-column";
import { navPage } from "@/sanity/schemas/objects/nav-page";
import { navProduct } from "@/sanity/schemas/objects/nav-product";
import { navTaxon } from "@/sanity/schemas/objects/nav-taxon";
import { navTaxonomy } from "@/sanity/schemas/objects/nav-taxonomy";
import { productOption } from "@/sanity/schemas/objects/product-option";
import { productShowcase } from "@/sanity/schemas/objects/product-showcase";
import { productSpecification } from "@/sanity/schemas/objects/product-specification";
import { productVariant } from "@/sanity/schemas/objects/product-variant";
import { seo } from "@/sanity/schemas/objects/seo";

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
		productShowcase,

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

		promoBlock,
		collection,

		// Settings
		generalSettings,
		headerSettings,
		footerSettings,
		seoSettings,
		socialSettings,
	],
};

export { schema };
