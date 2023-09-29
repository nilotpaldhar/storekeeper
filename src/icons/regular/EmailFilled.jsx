import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiFillMail } from 'react-icons/ai';

/**
 * Render the EmailFilled icon.
 *
 * @return {Element} The EmailFilled icon.
 */
const EmailFilled = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiFillMail />
	</span>
);

/**
 * Default Props.
 */
EmailFilled.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
EmailFilled.propTypes = {
	className: PropTypes.string,
};

export default EmailFilled;
