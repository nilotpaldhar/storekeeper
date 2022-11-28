import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiFillFacebook } from 'react-icons/ai';

/**
 * Render the Facebook icon.
 *
 * @return {Element} The Facebook icon.
 */
const Facebook = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiFillFacebook />
	</span>
);

/**
 * Default Props.
 */
Facebook.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Facebook.propTypes = {
	className: PropTypes.string,
};

export default Facebook;
