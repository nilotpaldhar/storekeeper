import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineArrowUp } from 'react-icons/ai';

/**
 * Render the ArrowUp icon.
 *
 * @return {Element} The ArrowUp icon.
 */
const ArrowUp = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineArrowUp />
	</span>
);

/**
 * Default Props.
 */
ArrowUp.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowUp.propTypes = {
	className: PropTypes.string,
};

export default ArrowUp;
