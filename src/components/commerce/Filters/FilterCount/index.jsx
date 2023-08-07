import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Render the FilterCount component.
 *
 * @return {Element} The FilterCount component.
 */
const FilterCount = ({ count, isActive }) => (
	<div
		className={clsx(
			'flex items-center justify-center w-5 h-5 bg-neutral-50 text-neutral-900 transition-colors duration-300',
			isActive && 'bg-primary-600 text-white'
		)}
	>
		<span className="block text-xs font-normal leading-none">{count}</span>
	</div>
);

/**
 * Default Props.
 */
FilterCount.defaultProps = {
	count: 0,
	isActive: false,
};

/**
 * Prop Types.
 */
FilterCount.propTypes = {
	count: PropTypes.number,
	isActive: PropTypes.bool,
};

export default FilterCount;
