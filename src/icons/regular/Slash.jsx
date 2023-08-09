import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { CgFormatSlash } from 'react-icons/cg';
import { RxSlash } from 'react-icons/rx';

/**
 * Render the Slash icon.
 *
 * @return {Element} The Slash icon.
 */
const Slash = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<RxSlash />
	</span>
);

/**
 * Default Props.
 */
Slash.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Slash.propTypes = {
	className: PropTypes.string,
};

export default Slash;
