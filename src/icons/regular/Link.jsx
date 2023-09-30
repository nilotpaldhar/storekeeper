import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiLink2 } from 'react-icons/fi';

/**
 * Render the Link icon.
 *
 * @return {Element} The Link icon.
 */
const Link = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<FiLink2 />
	</span>
);

/**
 * Default Props.
 */
Link.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Link.propTypes = {
	className: PropTypes.string,
};

export default Link;
