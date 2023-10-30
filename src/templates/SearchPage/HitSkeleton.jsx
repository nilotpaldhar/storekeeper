import PropTypes from 'prop-types';
import { useInstantSearch } from 'react-instantsearch';
import { clsx } from 'clsx';

const SvgImage = () => (
	<svg
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 20 18"
		className="w-8 h-8 text-neutral-200"
	>
		<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
	</svg>
);

const SkeletonGrid = () => (
	<div className="flex items-center justify-center aspect-square bg-neutral-50">
		<SvgImage />
	</div>
);

const SkeletonList = () => (
	<div className="flex items-center space-x-5">
		<div className="flex items-center justify-center aspect-square w-36 bg-neutral-50 sm:w-40 md:w-56 xl:w-64">
			<SvgImage />
		</div>
		<div className="flex-1">
			<div className="h-3 bg-neutral-50 mb-2 w-1/6" />
			<div className="h-5 bg-neutral-50 mb-4 w-1/2" />
			<div className="hidden md:block mb-4">
				<div className="h-2.5 bg-neutral-50 w-3/4 mb-2" />
				<div className="h-2.5 bg-neutral-50 w-2/3 mb-2" />
				<div className="h-2.5 bg-neutral-50 w-2/4" />
			</div>
			<div className="h-8 bg-neutral-50 w-1/4" />
		</div>
	</div>
);

/**
 * Render the HitSkeleton component.
 *
 * @return {Element} The HitSkeleton component.
 */
const HitSkeleton = ({ grid }) => {
	const { status } = useInstantSearch();

	if (status === 'loading' || status === 'stalled') {
		return (
			<div role="status" className="animate-pulse">
				<span className="sr-only">Loading...</span>
				<div
					className={clsx(
						'grid',
						grid
							? 'grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:gap-y-10 xxl:grid-cols-4 xxxl:gap-x-5'
							: 'grid-cols-1 gap-y-6 first-letter:md:gap-y-8'
					)}
				>
					{[...Array(12).keys()].map((s) => {
						const Component = grid ? SkeletonGrid : SkeletonList;
						return <Component key={s} />;
					})}
				</div>
			</div>
		);
	}

	return null;
};

/**
 * Default Props.
 */
HitSkeleton.defaultProps = {
	grid: true,
};

/**
 * Prop Types.
 */
HitSkeleton.propTypes = {
	grid: PropTypes.bool,
};

export default HitSkeleton;
