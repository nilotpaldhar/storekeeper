import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineMinus } from 'react-icons/ai';

/**
 * Render the Minus icon.
 *
 * @return {Element} The Minus icon.
 */
const Minus = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineMinus />
	</span>
);

/**
 * Default Props.
 */
Minus.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Minus.propTypes = {
	className: PropTypes.string,
};

export default Minus;
