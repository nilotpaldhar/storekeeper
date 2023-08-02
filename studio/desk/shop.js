import { BsCart, BsGift, BsGrid3X3Gap } from 'react-icons/bs';
import { TfiAnnouncement } from 'react-icons/tfi';
import { MdOutlineColorLens } from 'react-icons/md';

// Products Menu
const productsMenu = (S) =>
	S.listItem()
		.title('Products')
		.icon(BsGift)
		.child(
			S.documentTypeList('product')
				.title('Products')
				.child((documentId) => S.document().documentId(documentId).schemaType('product'))
		);

// Categories Menu
const categoriesMenu = (S) =>
	S.listItem()
		.title('Categories')
		.icon(BsGrid3X3Gap)
		.child(
			S.documentTypeList('category')
				.title('Categories')
				.child((documentId) => S.document().documentId(documentId).schemaType('category'))
		);

// Brands Menu
const brandsMenu = (S) =>
	S.listItem()
		.title('Brands')
		.icon(TfiAnnouncement)
		.child(
			S.documentTypeList('brand')
				.title('Brands')
				.child((documentId) => S.document().documentId(documentId).schemaType('brand'))
		);

// Colors Menu
const colorsMenu = (S) =>
	S.listItem()
		.title('Colors')
		.icon(MdOutlineColorLens)
		.child(
			S.documentTypeList('productColor')
				.title('Colors')
				.child((documentId) => S.document().documentId(documentId).schemaType('productColor'))
		);

// Shop Menu
export const shopMenu = (S) =>
	S.listItem()
		.title('Shop')
		.id('shop')
		.child(
			S.list()
				.title('Shop')
				.items([
					productsMenu(S),
					S.divider(),
					categoriesMenu(S),
					S.divider(),
					brandsMenu(S),
					S.divider(),
					colorsMenu(S),
				])
		)
		.icon(BsCart);

export default shopMenu;
