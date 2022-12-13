import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoAppsSharp } from 'react-icons/io5';

/**
 * Render the LayoutGrid icon.
 *
 * @return {Element} The LayoutGrid icon.
 */
const LayoutGrid = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<IoAppsSharp />
	</span>
);

/**
 * Default Props.
 */
LayoutGrid.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
LayoutGrid.propTypes = {
	className: PropTypes.string,
};

export default LayoutGrid;
