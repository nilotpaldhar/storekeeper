import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineReload } from 'react-icons/ai';

/**
 * Render the Reload icon.
 *
 * @return {Element} The Reload icon.
 */
const Reload = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineReload />
	</span>
);

/**
 * Default Props.
 */
Reload.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Reload.propTypes = {
	className: PropTypes.string,
};

export default Reload;
