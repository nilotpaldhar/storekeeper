import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineTwitter } from 'react-icons/ai';

/**
 * Render the Twitter icon.
 *
 * @return {Element} The Twitter icon.
 */
const Twitter = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
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
