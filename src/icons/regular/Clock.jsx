import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineClockCircle } from 'react-icons/ai';

/**
 * Render the Clock icon.
 *
 * @return {Element} The Clock icon.
 */
const Clock = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineClockCircle />
	</span>
);

/**
 * Default Props.
 */
Clock.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Clock.propTypes = {
	className: PropTypes.string,
};

export default Clock;
