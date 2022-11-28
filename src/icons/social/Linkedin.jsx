import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiFillLinkedin } from 'react-icons/ai';

/**
 * Render the Linkedin icon.
 *
 * @return {Element} The Linkedin icon.
 */
const Linkedin = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiFillLinkedin />
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
