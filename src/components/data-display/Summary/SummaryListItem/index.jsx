import PropTypes from 'prop-types';

/**
 * Render the SummaryListItem component.
 *
 * @return {Element} The SummaryListItem component.
 */
const SummaryListItem = ({ children, ...props }) => <li {...props}>{children}</li>;

/**
 * Default Props.
 */
SummaryListItem.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
SummaryListItem.propTypes = {
	children: PropTypes.node,
};

export default SummaryListItem;
