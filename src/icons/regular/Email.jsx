import PropTypes from 'prop-types';
import clsx from 'clsx';
import { RiMailFill } from 'react-icons/ri';

/**
 * Render the Email icon.
 *
 * @return {Element} The Email icon.
 */
const Email = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<RiMailFill />
	</span>
);

/**
 * Default Props.
 */
Email.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Email.propTypes = {
	className: PropTypes.string,
};

export default Email;
