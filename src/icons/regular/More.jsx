import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineMore } from 'react-icons/ai';

/**
 * Render the More icon.
 *
 * @return {Element} The More icon.
 */
const More = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineMore />
	</span>
);

/**
 * Default Props.
 */
More.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
More.propTypes = {
	className: PropTypes.string,
};

export default More;
