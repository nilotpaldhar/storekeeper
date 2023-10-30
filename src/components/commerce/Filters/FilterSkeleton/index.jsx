// import PropTypes from 'prop-types';

/**
 * Render the FilterSkeleton component.
 *
 * @return {Element} The FilterSkeleton component.
 */
const FilterSkeleton = () => (
	<div role="status" className="animate-pulse">
		<span className="sr-only">Loading...</span>
		<div>
			<div className="w-full h-6 bg-neutral-50 mb-6" />
			<div className="flex flex-col space-y-3">
				<div className="w-4/5 h-4 bg-neutral-50" />
				<div className="w-2/4 h-4 bg-neutral-50" />
				<div className="w-2/3 h-4 bg-neutral-50" />
				<div className="w-2/4 h-4 bg-neutral-50" />
				<div className="w-1/5 h-4 bg-neutral-50" />
				<div className="w-3/5 h-4 bg-neutral-50" />
			</div>
		</div>
	</div>
);

/**
 * Prop Types.
 */
FilterSkeleton.propTypes = {};

export default FilterSkeleton;
