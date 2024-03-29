import PropTypes from 'prop-types';
import singletonRouter from 'next/router';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import searchClient from '@config/algolia';
import { Configure, InfiniteHits, InstantSearch, SortBy, PoweredBy } from 'react-instantsearch';
import { singleIndex } from 'instantsearch.js/es/lib/stateMappings';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';

import { selectProductCatalogLayout } from '@store/slices/layout/layout.selectors';
import { ALGOLIA_INDEX, PRODUCT_CATALOG_COUNT } from '@constants';

/** Components. */
import Empty from '@ui/feedback/Empty';
import Filters from '@ui/commerce/Filters';
import Container from '@ui/general/Container';
import LoadingUI from '@ui/feedback/LoadingUI';
import RefinementList from '@ui/commerce/RefinementList';

import FallBack from '@templates/SearchPage/FallBack';
import HitWrapper from '@templates/SearchPage/HitWrapper';
import HitSkeleton from '@templates/SearchPage/HitSkeleton';
import SwitchLayout from '@templates/SearchPage/SwitchLayout';
import VirtualSearchBox from '@templates/SearchPage/VirtualSearchBox';
import NoResultsBoundary from '@templates/SearchPage/NoResultsBoundary';

import clsx from 'clsx';

const MobileFilters = dynamic(() => import('@templates/SearchPage/MobileFilters'));

/**
 * Render the SearchPageTmpl component.
 *
 * @return {Element} The SearchPageTmpl component.
 */
const SearchPageTmpl = ({ loading, initialQuery, info }) => {
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

		list: `w-full grid ${
			layout === 'list'
				? 'grid-cols-1 gap-y-6 md:gap-y-8'
				: 'grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:gap-y-10 xxl:grid-cols-4 xxxl:gap-x-5'
		}`,

		loadPrevious: clsx(
			'w-full mb-8 bg-white text-neutral-900 border border-neutral-100 px-8 py-2 text-sm min-h-[40px] font-normal leading-none backface-hidden transition duration-300',
			'hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-50',
			'focus-visible:outline-offset-[3px] focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-neutral-600'
		),
		disabledLoadPrevious: 'hidden',

		loadMore: clsx(
			'mt-14 bg-primary-600 text-white max-w-max px-8 py-2 text-sm min-h-[40px] font-normal leading-none backface-hidden transition duration-300',
			'hover:shadow-md hover:text-white hover:bg-primary-500 active:bg-primary-500',
			'focus-visible:outline-offset-[3px] focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-primary-600'
		),
		disabledLoadMore: 'hidden',
	};

	return (
		<LoadingUI loading={loading}>
			{initialQuery ? (
				<div className="min-h-screen">
					<InstantSearch
						key={initialQuery}
						searchClient={searchClient}
						indexName={ALGOLIA_INDEX.product}
						routing={{
							stateMapping: singleIndex(ALGOLIA_INDEX.product),
							router: createInstantSearchRouterNext({ singletonRouter }),
						}}
						future={{ preserveSharedStateOnUnmount: true }}
					>
						<Configure hitsPerPage={PRODUCT_CATALOG_COUNT} />
						<VirtualSearchBox />

						<div className="py-10 lg:py-14 text-neutral-900">
							<Container className="lg:flex lg:space-x-8">
								<NoResultsBoundary fallback={null}>
									<aside className="hidden xl:block w-72">
										<Filters headerTitle="Filters:" />
									</aside>
								</NoResultsBoundary>

								<main className="flex-1">
									<div className="xl:flex lg:items-center">
										<div className="flex items-center justify-between gap-3 flex-wrap flex-1 px-px text-base xl:mr-4">
											<div>{info}</div>
											<div className="w-full max-w-[114px]">
												<PoweredBy theme="light" classNames={{ root: 'w-full', link: 'block' }} />
											</div>
										</div>
										<NoResultsBoundary fallback={null}>
											<div className="flex items-center mt-6 xl:mt-0">
												<MobileFilters className="block mr-2 xl:hidden" />

												<div className="flex items-center ml-auto">
													<SortBy
														items={sortItems}
														classNames={{
															select: `
																appearance-none block w-full text-sm text-neutral-900 
																bg-white border border-neutral-100 pl-2 md:pl-4 pr-2 lg:pr-8 py-2
																focus:outline-none focus-visible:border-neutral-900 cursor-pointer transition duration-300
															`,
														}}
													/>
												</div>

												<SwitchLayout className="flex items-center ml-4 space-x-2" />
											</div>
										</NoResultsBoundary>
									</div>

									<NoResultsBoundary fallback={null}>
										<RefinementList />
									</NoResultsBoundary>

									<div className="px-px mt-6">
										<NoResultsBoundary fallback={<FallBack />}>
											<div className="mb-6">
												<HitSkeleton grid={layout === 'grid'} />
											</div>
											<InfiniteHits
												showPrevious
												hitComponent={HitWrapper}
												classNames={infiniteHitsClassNames}
												translations={{
													showMoreButtonText: 'Load More',
													showPreviousButtonText: 'Load Previous',
												}}
											/>
										</NoResultsBoundary>
									</div>
								</main>
							</Container>
						</div>
					</InstantSearch>
				</div>
			) : (
				<main className="flex items-center justify-center min-h-[80vh]">
					<Container>
						<Empty title={`No Query"`} />
					</Container>
				</main>
			)}
		</LoadingUI>
	);
};

/**
 * Default Props.
 */
SearchPageTmpl.defaultProps = {
	loading: false,
	initialQuery: '',
	info: '',
};

/**
 * Prop Types.
 */
SearchPageTmpl.propTypes = {
	loading: PropTypes.bool,
	initialQuery: PropTypes.string,
	info: PropTypes.node,
};

export default SearchPageTmpl;
