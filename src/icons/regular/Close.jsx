import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

/**
 * Render the Close icon.
 *
 * @return {Element} The Close icon.
 */
const Close = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineClose />
	</span>
);

/**
 * Default Props.
 */
Close.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Close.propTypes = {
	className: PropTypes.string,
};

export default Close;
