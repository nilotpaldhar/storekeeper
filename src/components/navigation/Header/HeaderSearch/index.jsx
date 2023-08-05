import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import searchClient from '@config/algolia';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

/** Components. */
import AutoComplete from '@ui/commerce/AutoComplete';
import AutocompleteItem from '@ui/commerce/AutoComplete/AutocompleteItem';
import AutocompleteItemAction from '@ui/commerce/AutoComplete/AutocompleteItemAction';

/** Icons. */
import ClockIcon from '@icons/regular/Clock';
import TrashIcon from '@icons/regular/Trash';
import SearchIcon from '@icons/regular/Search';
import ArrowUpLeftIcon from '@icons/regular/ArrowUpLeft';

/** Helpers */
import useLazyRef from '@hooks/useLazyRef';
import { ALGOLIA_RECENT_SEARCHES_KEY, ALGOLIA_INDEX } from '@constants';
import clsx from 'clsx';

/**
 * Render the HeaderSearch component.
 *
 * @return {Element} The HeaderSearch component.
 */
const HeaderSearch = ({ className, ...props }) => {
	const router = useRouter();

	const classNames = {
		root: 'flex items-center w-full h-full',

		form: 'flex w-full lg:px-3',

		input:
			'block w-full bg-transparent text-sm text-neutral-900 font-normal placeholder:text-neutral-400 placeholder:font-light outline-none',
		inputWrapper: 'flex items-center flex-1',

		inputWrapperPrefix: 'flex items-center mr-2',
		label: 'flex items-center',
		submitButton:
			'text-neutral-400 hover:text-neutral-900 transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5',

		inputWrapperSuffix: 'hidden lg:flex lg:items-center lg:ml-2',
		clearButton:
			'text-neutral-400 hover:text-neutral-900 transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5',

		detachedContainer: 'fixed inset-0 flex flex-col divide-y divide-neutral-100 font-[nunito]',
		detachedFormContainer: 'flex bg-white h-20 px-5',

		detachedSearchButton:
			'flex items-center h-full text-neutral-900 hover:text-current focus-visible:text-primary-600 focus-visible:outline-primary-600',
		detachedSearchButtonIcon: '-translate-y-px [&>svg]:w-5 [&>svg]:h-5',
		detachedSearchButtonPlaceholder: 'sr-only',
		detachedSearchButtonQuery: 'sr-only',

		detachedCancelButton: 'font-semibold text-neutral-900 hover:text-current ml-2',

		panel: 'flex-1 bg-white z-[1020] lg:absolute lg:ring-1 lg:ring-neutral-100 lg:mt-px',
	};

	/** Recent searches plugin. */
	const getRecentSearchesPlugin = useLazyRef(() =>
		createLocalStorageRecentSearchesPlugin({
			key: ALGOLIA_RECENT_SEARCHES_KEY,
			limit: 10,
			transformSource: ({ source, onRemove, onTapAhead }) => ({
				...source,
				templates: {
					// eslint-disable-next-line react/no-unstable-nested-components
					item: ({ item, components }) => (
						<AutocompleteItem
							router={router}
							href={`/search/?query=${item.label}`}
							label={item.label}
							icon={ClockIcon}
							actions={
								<>
									<AutocompleteItemAction
										icon={TrashIcon}
										label="Remove this search"
										onClick={(event) => {
											event.preventDefault();
											event.stopPropagation();
											onRemove(item.label);
										}}
									/>
									<AutocompleteItemAction
										icon={ArrowUpLeftIcon}
										label={`Fill query with "${item.label}"`}
										onClick={(event) => {
											event.preventDefault();
											event.stopPropagation();
											onTapAhead(item);
										}}
									/>
								</>
							}
						>
							<components.ReverseHighlight hit={item} attribute="label" />
						</AutocompleteItem>
					),
				},
			}),
		})
	);

	/** Query suggestions plugin. */
	const getQuerySuggestionsPlugin = useLazyRef(() =>
		createQuerySuggestionsPlugin({
			searchClient,
			indexName: ALGOLIA_INDEX.productQuerySuggestion,
			transformSource: ({ source, onTapAhead }) => ({
				...source,
				getItemUrl: ({ item }) => `/search/?query=${item.query}`,
				templates: {
					...source.templates,
					// eslint-disable-next-line react/no-unstable-nested-components
					item: ({ item, components }) => (
						<AutocompleteItem
							router={router}
							href={`/search/?query=${item.query}`}
							label={item.query}
							icon={SearchIcon}
							actions={
								<AutocompleteItemAction
									icon={ArrowUpLeftIcon}
									label={`Fill query with "${item.label}"`}
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										onTapAhead(item);
									}}
								/>
							}
						>
							<components.ReverseHighlight hit={item} attribute="query" />
						</AutocompleteItem>
					),
				},
			}),
		})
	);

	return (
		<div
			className={clsx(
				'flex items-center lg:max-w-md xxl:max-w-sm w-max lg:w-full h-full',
				className
			)}
			{...props}
		>
			<AutoComplete
				className={clsx(
					'flex items-center w-full h-full bg-transparent transition-colors duration-300',
					'lg:h-10 lg:bg-neutral-50 lg:border lg:border-transparent lg:focus-within:border-neutral-100 lg:focus-within:bg-transparent'
				)}
				classNames={classNames}
				initialState={{ query: router.query?.query || '' }}
				navigator={{
					navigate: ({ itemUrl }) => {
						router.push(itemUrl);
					},
				}}
				onSubmit={({ state }) => {
					router.push(`/search/?query=${state.query}`);
				}}
				plugins={[getRecentSearchesPlugin(), getQuerySuggestionsPlugin()]}
			/>
		</div>
	);
};

/**
 * Default Props.
 */
HeaderSearch.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
HeaderSearch.propTypes = {
	className: PropTypes.string,
};

export default HeaderSearch;
