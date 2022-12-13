import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineArrowDown } from 'react-icons/ai';

/**
 * Render the ArrowDown icon.
 *
 * @return {Element} The ArrowDown icon.
 */
const ArrowDown = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineArrowDown />
	</span>
);

/**
 * Default Props.
 */
ArrowDown.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowDown.propTypes = {
	className: PropTypes.string,
};

export default ArrowDown;
