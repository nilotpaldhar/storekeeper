import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineExclamation } from 'react-icons/ai';

/**
 * Render the Exclamation icon.
 *
 * @return {Element} The Exclamation icon.
 */
const Exclamation = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineExclamation />
	</span>
);

/**
 * Default Props.
 */
Exclamation.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Exclamation.propTypes = {
	className: PropTypes.string,
};

export default Exclamation;
