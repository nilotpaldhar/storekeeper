import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineTwitter } from 'react-icons/ai';

/**
 * Render the Twitter icon.
 *
 * @return {Element} The Twitter icon.
 */
const Twitter = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineTwitter />
	</span>
);

/**
 * Default Props.
 */
Twitter.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Twitter.propTypes = {
	className: PropTypes.string,
};

export default Twitter;
