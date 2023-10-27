import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiFillHeart } from 'react-icons/ai';

/**
 * Render the Heart icon.
 *
 * @return {Element} The Heart icon.
 */
const Heart = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiFillHeart />
	</span>
);

/**
 * Default Props.
 */
Heart.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Heart.propTypes = {
	className: PropTypes.string,
};

export default Heart;
