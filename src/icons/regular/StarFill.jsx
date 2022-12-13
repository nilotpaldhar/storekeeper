import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiFillStar } from 'react-icons/ai';

/**
 * Render the StarFill icon.
 *
 * @return {Element} The StarFill icon.
 */
const StarFill = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiFillStar />
	</span>
);

/**
 * Default Props.
 */
StarFill.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
StarFill.propTypes = {
	className: PropTypes.string,
};

export default StarFill;
