import PropTypes from 'prop-types';
import FilterCount from '@ui/commerce/Filters/FilterCount';
import clsx from 'clsx';

/**
 * Render the FilterCategoryItem component.
 *
 * @return {Element} The FilterCategoryItem component.
 */
const FilterCategoryItem = ({ id, value, label, count, isActive, refine }) => (
	<div className="flex items-center justify-between space-x-1">
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
				className="peer sr-only"
			/>
			<span
				className={clsx(
					'block text-current select-none font-normal',
					'peer-focus-visible:outline-1 peer-focus-visible:outline-dashed peer-focus-visible:outline-neutral-600',
					isActive && 'peer-focus-visible:outline-primary-600'
				)}
			>
				{label}
			</span>
		</label>
		<FilterCount count={count} isActive={isActive} />
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
