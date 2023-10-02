import PropTypes from 'prop-types';
import clsx from 'clsx';
import { RiFacebookFill } from 'react-icons/ri';

/**
 * Render the Facebook icon.
 *
 * @return {Element} The Facebook icon.
 */
const Facebook = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<RiFacebookFill />
	</span>
);

/**
 * Default Props.
 */
Facebook.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Facebook.propTypes = {
	className: PropTypes.string,
};

export default Facebook;
