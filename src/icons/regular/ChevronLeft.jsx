import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineLeft } from 'react-icons/ai';

/**
 * Render the ChevronLeft icon.
 *
 * @return {Element} The ChevronLeft icon.
 */
const ChevronLeft = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineLeft />
	</span>
);

/**
 * Default Props.
 */
ChevronLeft.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ChevronLeft.propTypes = {
	className: PropTypes.string,
};

export default ChevronLeft;
