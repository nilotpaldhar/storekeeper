import S from '@sanity/desk-tool/structure-builder';
import { AiOutlineUser } from 'react-icons/ai';

// Users Menu
export const usersMenu = S.listItem()
	.title('Users')
	.child(S.documentTypeList('user').title('Users'))
	.icon(AiOutlineUser);

export default usersMenu;
