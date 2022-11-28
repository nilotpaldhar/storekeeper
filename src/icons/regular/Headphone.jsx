import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineCustomerService } from 'react-icons/ai';

/**
 * Render the Headphone icon.
 *
 * @return {Element} The Headphone icon.
 */
const Headphone = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineCustomerService />
	</span>
);

/**
 * Default Props.
 */
Headphone.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Headphone.propTypes = {
	className: PropTypes.string,
};

export default Headphone;
