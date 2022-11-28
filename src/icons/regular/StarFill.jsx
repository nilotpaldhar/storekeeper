import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiFillStar } from 'react-icons/ai';

/**
 * Render the StarFill icon.
 *
 * @return {Element} The StarFill icon.
 */
const StarFill = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiFillStar />
	</span>
);

/**
 * Default Props.
 */
StarFill.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
StarFill.propTypes = {
	className: PropTypes.string,
};

export default StarFill;
