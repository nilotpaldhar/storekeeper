import { PackagePlus } from "lucide-react";
import { defineField, defineType } from "sanity";

import { ProductVariantInput } from "@/components/sanity/product-variant-input";

const productVariant = defineType({
	name: "productVariant",
	title: "Product Variant",
	icon: PackagePlus,
	type: "object",
	fields: [
		defineField({
			name: "variantKey",
			title: "Variant Key",
			type: "string",
			components: {
				input: ProductVariantInput,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "sku",
			title: "SKU",
			type: "reference",
			to: [{ type: "sku" }],
			validation: (rule) => rule.required(),
			options: { disableNew: true },
		}),
		defineField({
			name: "gallery",
			title: "Image Gallery",
			type: "array",
			of: [{ type: "mediaImage" }],
			description: "Upload up to 6 product images.",
			validation: (rule) => rule.max(6).error("You can upload up to 6 images only."),
		}),
	],
	preview: {
		select: {
			title: "variantKey",
			sku: "sku.name",
			media: "gallery.0.image",
		},
		prepare({ title, sku, media }) {
			return { title: title, subtitle: sku, media };
		},
	},
});

export { productVariant };
