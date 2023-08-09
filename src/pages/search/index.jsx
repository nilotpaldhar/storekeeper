import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

/** Templates & Components. */
import Seo from '@ui/general/Seo';
import SearchPageTmpl from '@templates/SearchPage';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Functions. */
import fetchPage from '@libs/general/dynamic-page/fetchPage';

/**
 * Render the SearchPage component.
 *
 * @return {Element} The SearchPage component.
 */
const SearchPage = () => {
	const router = useRouter();
	const initialQuery = router.query?.query;
	const loading = !router.isReady;

	return (
		<>
			<Seo title={initialQuery} />
			<SearchPageTmpl
				loading={loading}
				initialQuery={initialQuery}
				info={
					<div className="flex space-x-1 text-base items center">
						<span>Showing results for</span>
						<span className="font-semibold">&quot;{initialQuery}&quot;</span>
					</div>
				}
			/>
		</>
	);
};

/**
 * Prop Types.
 */
SearchPage.propTypes = {
	page: PropTypes.shape({}).isRequired,
};

/** Page Layout. */
SearchPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	try {
		const data = await fetchPage(preview, 'searchpage');
		return { props: { data } };
	} catch (error) {
		return { notFound: true };
	}
};

export default SearchPage;
