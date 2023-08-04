import PropTypes from 'prop-types';

/** Templates & Components. */
import SearchPageTmpl from '@templates/SearchPage';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Functions. */
import fetchPage from '@libs/general/dynamic-page/fetchPage';

/**
 * Render the SearchPage component.
 *
 * @return {Element} The SearchPage component.
 */
const SearchPage = () => <SearchPageTmpl />;

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
