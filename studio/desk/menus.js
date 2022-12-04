import S from '@sanity/desk-tool/structure-builder';
import { BsList } from 'react-icons/bs';

// Menus Menu
export const menusMenu = S.listItem()
	.title('Menus')
	.child(S.documentTypeList('menu').title('Menus'))
	.icon(BsList);

export default menusMenu;
