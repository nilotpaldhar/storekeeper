import { BsList } from 'react-icons/bs';

// Menus Menu
export const menusMenu = (S) =>
	S.listItem().title('Menus').child(S.documentTypeList('menu').title('Menus')).icon(BsList);

export default menusMenu;
