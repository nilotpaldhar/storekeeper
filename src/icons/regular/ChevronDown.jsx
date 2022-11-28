import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineDown } from 'react-icons/ai';

/**
 * Render the ChevronDown icon.
 *
 * @return {Element} The ChevronDown icon.
 */
const ChevronDown = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineDown />
	</span>
);

/**
 * Default Props.
 */
ChevronDown.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ChevronDown.propTypes = {
	className: PropTypes.string,
};

export default ChevronDown;
