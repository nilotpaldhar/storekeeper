import singletonRouter, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import searchClient from '@config/algolia';

import { Configure, InfiniteHits, InstantSearch, SortBy } from 'react-instantsearch-hooks-web';
import { singleIndex } from 'instantsearch.js/es/lib/stateMappings';
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs';

import { selectProductCatalogLayout } from '@store/slices/layout/layout.selectors';
import { ALGOLIA_INDEX, PRODUCT_CATALOG_COUNT } from '@constants';

/** Components & Icons. */
import FilterIcon from '@icons/regular/Filter';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';
import HitWrapper from '@templates/SearchPage/HitWrapper';
import SwitchLayout from '@templates/SearchPage/SwitchLayout';
import VirtualSearchBox from '@templates/SearchPage/VirtualSearchBox';

/**
 * Render the SearchPageTmpl component.
 *
 * @return {Element} The SearchPageTmpl component.
 */
const SearchPageTmpl = () => {
	const router = useRouter();
	const initialQuery = router.query?.query || '';

	/** Product catalog layout. */
	const layout = useSelector(selectProductCatalogLayout);

	/** Sort Items. */
	const sortItems = [
		{ label: 'Sort by: Relevance', value: ALGOLIA_INDEX.product },
		{ label: 'Sort by: Price low to high', value: ALGOLIA_INDEX.productPriceAsc },
		{ label: 'Sort by: Price high to low', value: ALGOLIA_INDEX.productPriceDesc },
	];

	/** Infinite hits classnames. */
	const infiniteHitsClassNames = {
		root: 'flex flex-col items-center',

		list: `w-full grid border-b border-neutral-100 pb-14 ${
			layout === 'list'
				? 'grid-cols-1 gap-y-8'
				: 'grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xxl:grid-cols-4 md:gap-x-5 md:gap-y-10 xl:gap-y-12'
		}`,

		loadPrevious:
			'w-full mb-8 bg-white text-neutral-900 border border-neutral-100 px-8 py-2 text-sm min-h-[40px] font-normal leading-none backface-hidden transition duration-300 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-50 focus-visible:outline-offset-[3px] focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-neutral-600',
		disabledLoadPrevious: 'hidden',

		loadMore:
			'mt-14 bg-primary-600 text-white max-w-max px-8 py-2 text-sm min-h-[40px] font-normal leading-none backface-hidden transition duration-300 hover:shadow-md hover:text-white hover:bg-primary-500 active:bg-primary-500 focus-visible:outline-offset-[3px] focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-primary-600',
		disabledLoadMore: 'hidden',
	};

	return (
		<InstantSearch
			key={initialQuery}
			searchClient={searchClient}
			indexName={ALGOLIA_INDEX.product}
			routing={{
				stateMapping: singleIndex(ALGOLIA_INDEX.product),
				router: createInstantSearchRouterNext({ singletonRouter }),
			}}
		>
			<Configure hitsPerPage={PRODUCT_CATALOG_COUNT} />
			<VirtualSearchBox />

			<main className="py-10 lg:py-14 text-neutral-900">
				<Container className="lg:flex lg:space-x-8">
					<aside className="hidden xl:block w-72 divide-y divide-neutral-100">
						<div className="px-px pb-6 flex items-center justify-between text-base">
							<div className="font-semibold">Filters:</div>
							<div>
								<RegularButton intent="primary-ghost" className="!px-px">
									Clear All
								</RegularButton>
							</div>
						</div>
						{/* Refinement List */}
						<div className="px-px py-6">
							{/* Filter List */}
							Filters will go here
						</div>
					</aside>

					<div className="flex-1">
						<div className="xl:flex lg:items-center">
							<div className="flex-1 flex space-x-1 text-base px-px">
								<span>Showing results for</span>
								<span className="font-semibold">&quot;{initialQuery}&quot;</span>
							</div>
							<div className="flex items-center mt-6 xl:mt-0">
								<RegularButton startIcon={FilterIcon} className="xl:hidden mr-2">
									Filters
								</RegularButton>

								<div className="ml-auto flex items-center">
									<SortBy
										items={sortItems}
										classNames={{
											select: `
												appearance-none block w-full text-sm text-neutral-900 
												bg-white border border-neutral-100 pl-2 md:pl-4 pr-2 lg:pr-8 py-2
												focus:outline-none focus:border-neutral-900 cursor-pointer transition duration-300
											`,
										}}
									/>
								</div>

								<SwitchLayout className="flex items-center space-x-1 ml-4" />
							</div>
						</div>
						<div className="mt-6 px-px">
							<InfiniteHits
								showPrevious
								hitComponent={HitWrapper}
								classNames={infiniteHitsClassNames}
								translations={{
									showMoreButtonText: 'Load More',
									showPreviousButtonText: 'Load Previous',
								}}
							/>
						</div>
					</div>
				</Container>
			</main>
		</InstantSearch>
	);
};

export default SearchPageTmpl;
