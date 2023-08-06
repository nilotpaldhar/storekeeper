import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Render the FilterCategoryItem component.
 *
 * @return {Element} The FilterCategoryItem component.
 */
const FilterCategoryItem = ({ id, value, label, count, isActive, refine }) => (
	<div className="flex items-center justify-between">
		<label
			htmlFor={id}
			className={clsx(
				'flex-1 cursor-pointer text-neutral-900 transition-colors duration-300',
				isActive && 'text-primary-600'
			)}
		>
			<input
				id={id}
				type="checkbox"
				value={value}
				checked={isActive}
				onChange={() => refine(value)}
				className="sr-only"
			/>
			<span className="block text-current select-none font-normal">{label}</span>
		</label>
		<div
			className={clsx(
				'flex items-center justify-center w-5 h-5 bg-neutral-50 text-neutral-900 transition-colors duration-300',
				isActive && 'bg-primary-600 text-white'
			)}
		>
			<span className="block text-xs font-normal leading-none">{count}</span>
		</div>
	</div>
);

/**
 * Prop Types.
 */
FilterCategoryItem.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	isActive: PropTypes.bool.isRequired,
	refine: PropTypes.func.isRequired,
};

export default FilterCategoryItem;
