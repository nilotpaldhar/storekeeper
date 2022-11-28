import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiFillInfoCircle } from 'react-icons/ai';

/**
 * Render the InfoCircle icon.
 *
 * @return {Element} The InfoCircle icon.
 */
const InfoCircle = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiFillInfoCircle />
	</span>
);

/**
 * Default Props.
 */
InfoCircle.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
InfoCircle.propTypes = {
	className: PropTypes.string,
};

export default InfoCircle;
