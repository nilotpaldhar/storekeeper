import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlinePlus } from 'react-icons/ai';

/**
 * Render the Plus icon.
 *
 * @return {Element} The Plus icon.
 */
const Plus = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlinePlus />
	</span>
);

/**
 * Default Props.
 */
Plus.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Plus.propTypes = {
	className: PropTypes.string,
};

export default Plus;
