import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

/**
 * Render the MoneyBill icon.
 *
 * @return {Element} The MoneyBill icon.
 */
const MoneyBill = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<FaRegMoneyBillAlt />
	</span>
);

/**
 * Default Props.
 */
MoneyBill.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
MoneyBill.propTypes = {
	className: PropTypes.string,
};

export default MoneyBill;
