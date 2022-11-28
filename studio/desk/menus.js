import S from '@sanity/desk-tool/structure-builder';
import { BsList, BsInfoCircle, BsBuilding } from 'react-icons/bs';
import { AiOutlineMobile } from 'react-icons/ai';
import { MdOutlineManageAccounts } from 'react-icons/md';

// Primary Navigation Menu
const primaryNavigationsMenu = S.listItem().title('Primary Navigation').icon(BsList);

// Mobile Navigation Menu
const mobileNavigationsMenu = S.listItem().title('Mobile Navigation').icon(AiOutlineMobile);

// Footer Company Menu
const footerCompanyMenu = S.listItem().title('Footer Company').icon(BsBuilding);

// Footer Info Menu
const footerInfoMenu = S.listItem().title('Footer Info').icon(BsInfoCircle);

// Footer Account Menu
const footerAccMenu = S.listItem().title('Footer Account').icon(MdOutlineManageAccounts);

// Menus Menu
export const menusMenu = S.listItem()
	.title('Menus')
	.id('menus')
	.child(
		S.list()
			.title('Menus')
			.items([
				primaryNavigationsMenu,
				S.divider(),
				mobileNavigationsMenu,
				S.divider(),
				footerCompanyMenu,
				footerInfoMenu,
				footerAccMenu,
			])
	)
	.icon(BsList);

export default menusMenu;
