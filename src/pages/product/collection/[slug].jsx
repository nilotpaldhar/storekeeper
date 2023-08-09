import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/** Template & Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import SearchPageTmpl from '@templates/SearchPage';
import LoadingUI from '@ui/feedback/LoadingUI';
import Breadcrumb from '@ui/navigation/Breadcrumb';

/** Functions. */
import fetchCategoryPage from '@libs/commerce/category/fetchPage';
import fetchCategoryPaths from '@libs/commerce/category/fetchPaths';

/**
 * Render the CategoryPage component.
 *
 * @return {Element} The CategoryPage component.
 */
const CategoryPage = ({ page }) => {
	const router = useRouter();
	const query = router.query?.query;
	const slug = page?.slug;

	useEffect(() => {
		if (router.isReady && !query) {
			router.push(`/product/collection/${slug}?query=${slug}`);
		}
	}, [query, slug, router]);

	if (!query) return <LoadingUI loading />;

	const breadcrumbs = [
		...page.breadcrumbs.map(({ id, title, permalink }) => ({
			id,
			label: title,
			href: `/product/collection/${permalink}?query=${permalink}`,
		})),
		{
			id: page.id,
			label: page.title,
			href: `/product/collection/${page.slug}?query=${page.slug}`,
		},
	];

	return <SearchPageTmpl initialQuery={slug} info={<Breadcrumb items={breadcrumbs} />} />;
};

/**
 * Prop Types.
 */
CategoryPage.propTypes = {
	page: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		breadcrumbs: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string,
				permalink: PropTypes.string,
			})
		),
	}).isRequired,
};

/** Page Layout. */
CategoryPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page paths.
 *
 * @return {object} Page props.
 */
export const getStaticPaths = async () => {
	const fallback = 'blocking';

	try {
		const categoryPaths = await fetchCategoryPaths();
		return { paths: categoryPaths || [], fallback };
	} catch (error) {
		return { paths: [], fallback };
	}
};

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview, params }) => {
	const slug = params?.slug;
	const revalidate = 10;

	try {
		const data = await fetchCategoryPage(preview, slug);
		const response = { props: { data }, revalidate };
		return data ? response : { notFound: true, revalidate };
	} catch (error) {
		return { notFound: true, revalidate };
	}
};

export default CategoryPage;
