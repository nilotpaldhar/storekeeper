import S from '@sanity/desk-tool/structure-builder';
import { BsCart } from 'react-icons/bs';
import { VscBrowser } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import { MdErrorOutline } from 'react-icons/md';

// Homepage Menu
const homepageMenu = S.listItem()
	.title('Home Page')
	.child(S.editor().id('homepage').schemaType('homepage').documentId('homepage'))
	.icon(AiOutlineHome);

// Shoppage Menu
const shoppageMenu = S.listItem()
	.title('Shop Page')
	.child(S.editor().id('shoppage').schemaType('shoppage').documentId('shoppage'))
	.icon(BsCart);

// Errorpage Menu
const errorpageMenu = S.listItem()
	.title('Error Page (404)')
	.child(S.editor().id('errorpage').schemaType('errorpage').documentId('errorpage'))
	.icon(MdErrorOutline);

// Other Pages Menu
const otherPagesMenu = S.listItem()
	.title('Other Pages')
	.schemaType('page')
	.child(
		S.documentTypeList('page')
			.title('Other Pages')
			.child((documentId) => S.document().documentId(documentId).schemaType('page'))
	)
	.icon(VscBrowser);

// Pages Menu
export const menusMenu = S.listItem()
	.title('Pages')
	.id('pages')
	.child(S.list().title('Pages').items([homepageMenu, shoppageMenu, errorpageMenu, otherPagesMenu]))
	.icon(VscBrowser);

export default menusMenu;
