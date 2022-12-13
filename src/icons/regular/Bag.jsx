import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineShopping } from 'react-icons/ai';

/**
 * Render the Bag icon.
 *
 * @return {Element} The Bag icon.
 */
const Bag = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineShopping />
	</span>
);

/**
 * Default Props.
 */
Bag.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Bag.propTypes = {
	className: PropTypes.string,
};

export default Bag;
