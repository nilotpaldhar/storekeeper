import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaPaperPlane } from 'react-icons/fa';

/**
 * Render the PaperPlane icon.
 *
 * @return {Element} The PaperPlane icon.
 */
const PaperPlane = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
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
