import PropTypes from 'prop-types';
import cx from 'classnames';
import { BiDollar } from 'react-icons/bi';

/**
 * Render the Dollar icon.
 *
 * @return {Element} The Dollar icon.
 */
const Dollar = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<BiDollar />
	</span>
);

/**
 * Default Props.
 */
Dollar.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Dollar.propTypes = {
	className: PropTypes.string,
};

export default Dollar;
