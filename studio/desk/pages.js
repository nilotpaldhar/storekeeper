import { BsCart } from 'react-icons/bs';
import { VscBrowser } from 'react-icons/vsc';
import { AiOutlineHome, AiOutlineLock } from 'react-icons/ai';
import { MdErrorOutline } from 'react-icons/md';

// Homepage Menu
const homepageMenu = (S) =>
	S.listItem()
		.title('Home Page')
		.child(S.editor().id('homepage').schemaType('homepage').documentId('homepage'))
		.icon(AiOutlineHome);

// Shoppage Menu
const shoppageMenu = (S) =>
	S.listItem()
		.title('Shop Page')
		.child(S.editor().id('shoppage').schemaType('shoppage').documentId('shoppage'))
		.icon(BsCart);

// Loginpage Menu
const loginpageMenu = (S) =>
	S.listItem()
		.title('Login Page')
		.child(S.editor().id('loginpage').schemaType('loginpage').documentId('loginpage'))
		.icon(AiOutlineLock);

// Errorpage Menu
const errorpageMenu = (S) =>
	S.listItem()
		.title('Error Page (404)')
		.child(S.editor().id('errorpage').schemaType('errorpage').documentId('errorpage'))
		.icon(MdErrorOutline);

// Other Pages Menu
const otherPagesMenu = (S) =>
	S.listItem()
		.title('Other Pages')
		.schemaType('page')
		.child(
			S.documentTypeList('page')
				.title('Other Pages')
				.child((documentId) => S.document().documentId(documentId).schemaType('page'))
		)
		.icon(VscBrowser);

// Pages Menu
export const menusMenu = (S) =>
	S.listItem()
		.title('Pages')
		.id('pages')
		.child(
			S.list()
				.title('Pages')
				.items([
					homepageMenu(S),
					shoppageMenu(S),
					loginpageMenu(S),
					errorpageMenu(S),
					otherPagesMenu(S),
				])
		)
		.icon(VscBrowser);

export default menusMenu;
