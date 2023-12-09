import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineDownload } from 'react-icons/ai';

/**
 * Render the Box icon.
 *
 * @return {Element} The Box icon.
 */
const Box = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineDownload />
	</span>
);

/**
 * Default Props.
 */
Box.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Box.propTypes = {
	className: PropTypes.string,
};

export default Box;
