import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineEye } from 'react-icons/ai';

/**
 * Render the Eye icon.
 *
 * @return {Element} The Eye icon.
 */
const Eye = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineEye />
	</span>
);

/**
 * Default Props.
 */
Eye.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Eye.propTypes = {
	className: PropTypes.string,
};

export default Eye;
