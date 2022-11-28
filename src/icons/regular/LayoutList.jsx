import PropTypes from 'prop-types';
import cx from 'classnames';
import { IoListSharp } from 'react-icons/io5';

/**
 * Render the LayoutList icon.
 *
 * @return {Element} The LayoutList icon.
 */
const LayoutList = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
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
