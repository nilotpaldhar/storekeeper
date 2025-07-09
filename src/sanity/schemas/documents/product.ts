import { Package } from "lucide-react";
import { defineField, defineType } from "sanity";

import { noSlashSlugValidation } from "@/sanity/helpers/slug-validation";

const product = defineType({
	name: "product",
	title: "Product",
	type: "document",
	icon: Package,
	fieldsets: [
		{ name: "basicInfo", title: "Basic Information", options: { collapsible: false } },
		{
			name: "variantConfig",
			title: "Variant Configuration",
			options: { collapsible: true, collapsed: false },
		},
		{
			name: "classification",
			title: "Category & Brand",
			options: { collapsible: true, collapsed: false },
		},
		{ name: "media", title: "Media & Visuals", options: { collapsible: true, collapsed: true } },
		{ name: "details", title: "Product Details", options: { collapsible: true, collapsed: true } },
		{ name: "related", title: "Related Products", options: { collapsible: true, collapsed: true } },
	],

	fields: [
		// ========== Basic Info ==========
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			fieldset: "basicInfo",
			description: "required",
			validation: (rule) =>
				rule.required().min(10).max(100).error("Title must be between 10 and 100 characters."),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			fieldset: "basicInfo",
			description: "required",
			options: { source: "title", maxLength: 100 },
			validation: noSlashSlugValidation,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			fieldset: "basicInfo",
			description: "Optional. Recommended 600-1000 characters.",
			validation: (rule) =>
				rule.min(600).max(1000).warning("Description should be between 600 and 1000 characters."),
		}),

		// ========== Variant Configuration ==========
		defineField({
			name: "hasVariants",
			title: "Has Variants?",
			type: "boolean",
			initialValue: false,
			fieldset: "variantConfig",
			description: "Enable if this product has multiple variants like size or color.",
		}),
		defineField({
			name: "sku",
			title: "SKU",
			type: "reference",
			to: [{ type: "sku" }],
			options: { disableNew: true },
			fieldset: "variantConfig",
			description: "required",
			hidden: ({ parent }) => parent?.hasVariants === true,
			validation: (rule) =>
				rule.custom((field, context) => {
					const hasVariants = (context?.parent as { hasVariants?: boolean })?.hasVariants;
					if (hasVariants === false && !field) return "SKU is required when variants are disabled.";
					return true;
				}),
		}),
		defineField({
			name: "options",
			title: "Product Options",
			type: "array",
			of: [{ type: "productOption" }],
			fieldset: "variantConfig",
			description: "required",
			hidden: ({ parent }) => parent?.hasVariants === false,
			validation: (rule) =>
				rule.custom((field, context) => {
					const hasVariants = (context?.parent as { hasVariants?: boolean })?.hasVariants;
					if (hasVariants && (!field || field.length < 1)) {
						return "At least one product option is required when variants are enabled.";
					}
					return true;
				}),
		}),
		defineField({
			name: "variants",
			title: "Product Variants",
			type: "array",
			of: [{ type: "productVariant" }],
			fieldset: "variantConfig",
			description: "required",
			hidden: ({ parent }) => parent?.hasVariants === false,
			validation: (rule) =>
				rule.custom((field, context) => {
					const hasVariants = (context?.parent as { hasVariants?: boolean })?.hasVariants;
					if (hasVariants && (!field || field.length < 1)) {
						return "At least one product variant is required when variants are enabled.";
					}
					return true;
				}),
		}),

		// ========== Classification ==========
		defineField({
			name: "taxon",
			title: "Category",
			type: "reference",
			to: [{ type: "taxon" }],
			fieldset: "classification",
			description:
				"Select a specific category (taxon) where this product belongs. " +
				"Only leaf-level categories (taxons with no children) are allowed.",
			options: {
				filter: "isLeaf == true",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "brand",
			title: "Brand",
			type: "reference",
			to: [{ type: "brand" }],
			fieldset: "classification",
			description: "Select the brand for this product",
			validation: (rule) => rule.required().error("Brand is required."),
		}),

		// ========== Media ==========
		defineField({
			name: "gallery",
			title: "Image Gallery",
			type: "array",
			of: [{ type: "mediaImage" }],
			fieldset: "media",
			description: "Upload up to 6 product images.",
			validation: (rule) => rule.max(6).error("You can upload up to 6 images only."),
		}),

		// ========== Product Details ==========
		defineField({
			name: "specifications",
			title: "Product Specifications",
			type: "array",
			fieldset: "details",
			of: [{ type: "productSpecification" }],
			validation: (rule) => rule.max(20).error("You can add up to 20 specifications only."),
		}),

		// ========== Related ==========
		defineField({
			name: "relatedProducts",
			title: "Related Products",
			fieldset: "related",
			description: "Select up to 12 related products. The current product cannot reference itself.",
			type: "array",
			of: [{ type: "reference", to: [{ type: "product" }] }],
			validation: (rule) =>
				rule
					.custom((related, context) => {
						if (!Array.isArray(related)) return true;

						const refs = related as { _ref?: string }[];

						const currentId = context.document?._id?.replace(/^drafts\./, "");
						const hasSelfReference = refs.some((ref) => ref._ref === currentId);

						return hasSelfReference ? "A product cannot reference itself as related." : true;
					})
					.max(12),
		}),

		// ========== SEO ==========
		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
			description: "Configure SEO metadata and social sharing info for this product.",
		}),
	],
	preview: {
		select: {
			title: "title",
			taxon: "taxon.title",
			media: "gallery.0.image",
		},
		prepare({ title, taxon, media }) {
			return { title, subtitle: taxon ?? "", media };
		},
	},
});

export { product };
