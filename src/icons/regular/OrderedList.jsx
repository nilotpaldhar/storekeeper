import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineOrderedList } from 'react-icons/ai';

/**
 * Render the OrderedList icon.
 *
 * @return {Element} The OrderedList icon.
 */
const OrderedList = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineOrderedList />
	</span>
);

/**
 * Default Props.
 */
OrderedList.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
OrderedList.propTypes = {
	className: PropTypes.string,
};

export default OrderedList;
