import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineFilter } from 'react-icons/ai';

/**
 * Render the Filter icon.
 *
 * @return {Element} The Filter icon.
 */
const Filter = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineFilter />
	</span>
);

/**
 * Default Props.
 */
Filter.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Filter.propTypes = {
	className: PropTypes.string,
};

export default Filter;
