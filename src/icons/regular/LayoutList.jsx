import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoListSharp } from 'react-icons/io5';

/**
 * Render the LayoutList icon.
 *
 * @return {Element} The LayoutList icon.
 */
const LayoutList = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<IoListSharp />
	</span>
);

/**
 * Default Props.
 */
LayoutList.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
LayoutList.propTypes = {
	className: PropTypes.string,
};

export default LayoutList;
