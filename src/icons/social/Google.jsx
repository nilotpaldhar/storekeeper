import PropTypes from 'prop-types';
import clsx from 'clsx';
import { RiGoogleFill } from 'react-icons/ri';

/**
 * Render the Google icon.
 *
 * @return {Element} The Google icon.
 */
const Google = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<RiGoogleFill />
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
