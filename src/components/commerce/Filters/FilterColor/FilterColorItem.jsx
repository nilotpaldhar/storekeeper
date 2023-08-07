import PropTypes from 'prop-types';

import FilterCount from '@ui/commerce/Filters/FilterCount';
import CheckIcon from '@icons/regular/Check';

import parseColorFacet from '@utils/search/parseColorFacet';
import clsx from 'clsx';

/**
 * Render the FilterColorItem component.
 *
 * @return {Element} The FilterColorItem component.
 */
const FilterColorItem = ({ id, value, label, count, isActive, refine }) => {
	const color = parseColorFacet(label);

	return (
		<div className="flex items-center justify-between space-x-1">
			<label htmlFor={id} className="flex items-center cursor-pointer">
				<input
					id={id}
					type="checkbox"
					value={value}
					checked={isActive}
					onChange={() => refine(value)}
					className="peer sr-only"
				/>
				<span
					style={{ backgroundColor: color.code }}
					className={clsx(
						'flex items-center justify-center w-5 h-5 rounded-full bg-black text-white',
						'outline-offset-2 outline-2 outline outline-neutral-200',
						'peer-focus-visible:outline-offset-2 peer-focus-visible:outline-2 peer-focus-visible:outline peer-focus-visible:outline-primary-600'
					)}
				>
					{isActive && <CheckIcon className="!text-xs !text-white !mix-blend-difference" />}
				</span>
				<span className="text-sm font-medium pl-2">{color.name}</span>
			</label>
			<FilterCount count={count} isActive={isActive} />
		</div>
	);
};

/**
 * Prop Types.
 */
FilterColorItem.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	isActive: PropTypes.bool.isRequired,
	refine: PropTypes.func.isRequired,
};

export default FilterColorItem;
