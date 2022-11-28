import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineStar } from 'react-icons/ai';

/**
 * Render the Star icon.
 *
 * @return {Element} The Star icon.
 */
const Star = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineStar />
	</span>
);

/**
 * Default Props.
 */
Star.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Star.propTypes = {
	className: PropTypes.string,
};

export default Star;
