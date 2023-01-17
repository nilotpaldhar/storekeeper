import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineGoogle } from 'react-icons/ai';

/**
 * Render the Google icon.
 *
 * @return {Element} The Google icon.
 */
const Google = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineGoogle />
	</span>
);

/**
 * Default Props.
 */
Google.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Google.propTypes = {
	className: PropTypes.string,
};

export default Google;
