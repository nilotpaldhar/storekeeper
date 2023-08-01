import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineDelete } from 'react-icons/ai';

/**
 * Render the Trash icon.
 *
 * @return {Element} The Trash icon.
 */
const Trash = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineDelete />
	</span>
);

/**
 * Default Props.
 */
Trash.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Trash.propTypes = {
	className: PropTypes.string,
};

export default Trash;
