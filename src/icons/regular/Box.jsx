import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineInbox } from 'react-icons/ai';

/**
 * Render the Box icon.
 *
 * @return {Element} The Box icon.
 */
const Box = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineInbox />
	</span>
);

/**
 * Default Props.
 */
Box.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Box.propTypes = {
	className: PropTypes.string,
};

export default Box;
