import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlinePhone } from 'react-icons/ai';

/**
 * Render the Phone icon.
 *
 * @return {Element} The Phone icon.
 */
const Phone = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlinePhone />
	</span>
);

/**
 * Default Props.
 */
Phone.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Phone.propTypes = {
	className: PropTypes.string,
};

export default Phone;
