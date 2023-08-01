import PropTypes from 'prop-types';

/**
 * Render the AutocompleteItemAction component.
 *
 * @return {Element} The AutocompleteItemAction component.
 */
const AutocompleteItemAction = ({ label, icon: Icon, ...props }) => (
	<button
		type="button"
		title={label}
		className="text-neutral-300 hover:text-neutral-900 transition-colors duration-100"
		{...props}
	>
		<Icon className="text-xs" />
	</button>
);

/**
 * Prop Types.
 */
AutocompleteItemAction.propTypes = {
	label: PropTypes.string.isRequired,
	icon: PropTypes.elementType.isRequired,
};

export default AutocompleteItemAction;
