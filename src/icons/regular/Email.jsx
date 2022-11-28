import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineMail } from 'react-icons/ai';

/**
 * Render the Email icon.
 *
 * @return {Element} The Email icon.
 */
const Email = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineMail />
	</span>
);

/**
 * Default Props.
 */
Email.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Email.propTypes = {
	className: PropTypes.string,
};

export default Email;
