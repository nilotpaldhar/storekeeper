import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineDash } from 'react-icons/ai';

/**
 * Render the Dash icon.
 *
 * @return {Element} The Dash icon.
 */
const Dash = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineDash />
	</span>
);

/**
 * Default Props.
 */
Dash.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Dash.propTypes = {
	className: PropTypes.string,
};

export default Dash;
