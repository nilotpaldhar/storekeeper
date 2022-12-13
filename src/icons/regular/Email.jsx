import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineMail } from 'react-icons/ai';

/**
 * Render the Email icon.
 *
 * @return {Element} The Email icon.
 */
const Email = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineMail />
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
