import PropTypes from 'prop-types';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import Anchor from '@ui/general/Anchor';

/**
 * Render the AutocompleteItem component.
 *
 * @return {Element} The AutocompleteItem component.
 */
const AutocompleteItem = ({ router, href, label, children, icon: Icon, actions, ...props }) => (
	<RouterContext.Provider value={router}>
		<Anchor
			href={href}
			className="flex items-center px-5 py-3 lg:px-3 hover:bg-neutral-50 font-[nunito] transition-colors duration-300"
			{...props}
		>
			<div className="flex items-center space-x-2 flex-1">
				<Icon className="!text-neutral-400 text-xl" />
				<div
					className="text-sm text-neutral-500 font-normal truncate [&>mark]:bg-transparent [&>mark]:text-neutral-900 [&>mark]:font-bold"
					title={label}
				>
					{children}
				</div>
			</div>
			{actions && <div className="flex items-center space-x-2">{actions}</div>}
		</Anchor>
	</RouterContext.Provider>
);

/**
 * Default Props.
 */
AutocompleteItem.defaultProps = {
	href: '#',
	label: '',
	children: '',
	actions: '',
};

/**
 * Prop Types.
 */
AutocompleteItem.propTypes = {
	router: PropTypes.shape({}).isRequired,
	href: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	icon: PropTypes.elementType.isRequired,
	actions: PropTypes.node,
};

export default AutocompleteItem;
