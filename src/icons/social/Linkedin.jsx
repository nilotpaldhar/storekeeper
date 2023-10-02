import PropTypes from 'prop-types';
import clsx from 'clsx';
import { RiLinkedinFill } from 'react-icons/ri';

/**
 * Render the Linkedin icon.
 *
 * @return {Element} The Linkedin icon.
 */
const Linkedin = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<RiLinkedinFill />
	</span>
);

/**
 * Default Props.
 */
Linkedin.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Linkedin.propTypes = {
	className: PropTypes.string,
};

export default Linkedin;
