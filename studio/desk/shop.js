import S from '@sanity/desk-tool/structure-builder';
import { BsCart, BsGift, BsGrid3X3Gap } from 'react-icons/bs';

// Products Menu
const productsMenu = S.listItem()
	.title('Products')
	.icon(BsGift)
	.child(
		S.documentTypeList('product')
			.title('Products')
			.child((documentId) => S.document().documentId(documentId).schemaType('product'))
	);

// Categories Menu
const categoriesMenu = S.listItem()
	.title('Categories')
	.icon(BsGrid3X3Gap)
	.child(
		S.documentTypeList('category')
			.title('Categories')
			.child((documentId) => S.document().documentId(documentId).schemaType('category'))
	);

// Shop Menu
export const shopMenu = S.listItem()
	.title('Shop')
	.id('shop')
	.child(S.list().title('Shop').items([productsMenu, S.divider(), categoriesMenu]))
	.icon(BsCart);

export default shopMenu;
