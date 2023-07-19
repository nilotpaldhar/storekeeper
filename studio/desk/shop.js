import { BsCart, BsGift, BsGrid3X3Gap } from 'react-icons/bs';

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

// Shop Menu
export const shopMenu = (S) =>
	S.listItem()
		.title('Shop')
		.id('shop')
		.child(
			S.list()
				.title('Shop')
				.items([productsMenu(S), S.divider(), categoriesMenu(S)])
		)
		.icon(BsCart);

export default shopMenu;
