import type { StructureBuilder } from "sanity/structure";

import {
	Barcode,
	Building2,
	Layers,
	Package,
	SlidersHorizontal,
	Store,
	Tag,
	LayoutGrid,
} from "lucide-react";

const productMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Products")
		.child(
			S.documentTypeList("product")
				.title("Products")
				.child((documentId) => S.document().documentId(documentId).schemaType("product"))
		)
		.icon(Package);

const skuMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("SKUs")
		.child(
			S.documentTypeList("sku")
				.title("SKUs")
				.child((documentId) => S.document().documentId(documentId).schemaType("sku"))
		)
		.icon(Barcode);

const taxonomyMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Taxonomies")
		.child(
			S.documentTypeList("taxonomy")
				.title("Taxonomies")
				.child((documentId) => S.document().documentId(documentId).schemaType("taxonomy"))
		)
		.icon(Layers);

const taxonMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Taxons")
		.child(
			S.documentTypeList("taxon")
				.title("Taxons")
				.child((documentId) => S.document().documentId(documentId).schemaType("taxon"))
		)
		.icon(Tag);

const brandMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Brands")
		.child(
			S.documentTypeList("brand")
				.title("Brands")
				.child((documentId) => S.document().documentId(documentId).schemaType("brand"))
		)
		.icon(Building2);

const promoBlockMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Promo Blocks")
		.child(
			S.documentTypeList("promoBlock")
				.title("Promo Blocks")
				.child((documentId) => S.document().documentId(documentId).schemaType("promoBlock"))
		)
		.icon(SlidersHorizontal);

const collectionBlockMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Collections")
		.child(
			S.documentTypeList("collection")
				.title("Collections")
				.child((documentId) => S.document().documentId(documentId).schemaType("collection"))
		)
		.icon(LayoutGrid);

const commerce = (S: StructureBuilder) =>
	S.listItem()
		.title("Commerce")
		.id("commerce")
		.child(
			S.list()
				.title("Commerce")
				.items([
					productMenu(S),
					skuMenu(S),
					S.divider(),
					taxonomyMenu(S),
					taxonMenu(S),
					brandMenu(S),
					S.divider(),
					promoBlockMenu(S),
					collectionBlockMenu(S),
				])
		)
		.icon(Store);

export { commerce };
