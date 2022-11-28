import PropTypes from 'prop-types';
import cx from 'classnames';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

/**
 * Render the ShieldCheck icon.
 *
 * @return {Element} The ShieldCheck icon.
 */
const ShieldCheck = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<IoShieldCheckmarkSharp />
	</span>
);

/**
 * Default Props.
 */
ShieldCheck.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ShieldCheck.propTypes = {
	className: PropTypes.string,
};

export default ShieldCheck;
