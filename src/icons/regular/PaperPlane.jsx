import PropTypes from 'prop-types';
import cx from 'classnames';
import { FaPaperPlane } from 'react-icons/fa';

/**
 * Render the PaperPlane icon.
 *
 * @return {Element} The PaperPlane icon.
 */
const PaperPlane = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<FaPaperPlane />
	</span>
);

/**
 * Default Props.
 */
PaperPlane.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
PaperPlane.propTypes = {
	className: PropTypes.string,
};

export default PaperPlane;
