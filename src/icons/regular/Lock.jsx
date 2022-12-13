import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineLock } from 'react-icons/ai';

/**
 * Render the Lock icon.
 *
 * @return {Element} The Lock icon.
 */
const Lock = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineLock />
	</span>
);

/**
 * Default Props.
 */
Lock.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Lock.propTypes = {
	className: PropTypes.string,
};

export default Lock;
