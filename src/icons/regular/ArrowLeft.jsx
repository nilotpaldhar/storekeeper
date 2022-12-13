import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineArrowLeft } from 'react-icons/ai';

/**
 * Render the ArrowLeft icon.
 *
 * @return {Element} The ArrowLeft icon.
 */
const ArrowLeft = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineArrowLeft />
	</span>
);

/**
 * Default Props.
 */
ArrowLeft.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowLeft.propTypes = {
	className: PropTypes.string,
};

export default ArrowLeft;
