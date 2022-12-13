import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineCheck } from 'react-icons/ai';

/**
 * Render the Check icon.
 *
 * @return {Element} The Check icon.
 */
const Check = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineCheck />
	</span>
);

/**
 * Default Props.
 */
Check.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Check.propTypes = {
	className: PropTypes.string,
};

export default Check;
