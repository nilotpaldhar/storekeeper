import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiFillInstagram } from 'react-icons/ai';

/**
 * Render the Instagram icon.
 *
 * @return {Element} The Instagram icon.
 */
const Instagram = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiFillInstagram />
	</span>
);

/**
 * Default Props.
 */
Instagram.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Instagram.propTypes = {
	className: PropTypes.string,
};

export default Instagram;
