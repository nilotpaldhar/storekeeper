import { defineField, defineType } from "sanity";
import { Barcode } from "lucide-react";

const sku = defineType({
	name: "sku",
	title: "SKU",
	type: "document",
	icon: Barcode,
	readOnly: true,
	fields: [
		defineField({
			name: "code",
			title: "SKU code",
			type: "string",
		}),
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "imageUrl",
			title: "Image URL",
			type: "url",
		}),
		defineField({
			name: "piecesPerPack",
			title: "Pieces per pack",
			type: "number",
		}),
		defineField({
			name: "weight",
			title: "Weight",
			type: "number",
		}),
		defineField({
			name: "unitOfWeight",
			title: "Unit of weight",
			type: "string",
		}),
		defineField({
			name: "hsTariffNumber",
			title: "HS Code",
			type: "string",
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "code",
		},
		prepare({ title, subtitle }) {
			return { title, subtitle };
		},
	},
});

export { sku };
