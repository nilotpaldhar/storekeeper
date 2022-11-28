import PropTypes from 'prop-types';
import cx from 'classnames';
import { RiCustomerService2Fill } from 'react-icons/ri';

/**
 * Render the CustomerService icon.
 *
 * @return {Element} The CustomerService icon.
 */
const CustomerService = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<RiCustomerService2Fill />
	</span>
);

/**
 * Default Props.
 */
CustomerService.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
CustomerService.propTypes = {
	className: PropTypes.string,
};

export default CustomerService;
