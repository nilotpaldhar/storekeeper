import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '@store/slices/wishlist/wishlist.thunks';
import * as wishlistSelector from '@store/slices/wishlist/wishlist.selectors';

import { HTTP_STATUS } from '@constants';

/** Components & Templates. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import WishlistPageTmpl from '@templates/WishlistPage';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the WishlistPage component.
 *
 * @return {Element} The WishlistPage component.
 */
const WishlistPage = () => {
	const dispatch = useDispatch();

	const status = useSelector(wishlistSelector.selectStatus);
	const contents = useSelector(wishlistSelector.selectContents);
	const errorMsg = useSelector(wishlistSelector.selectError);

	if (status === HTTP_STATUS.idle) {
		return null;
	}

	if (status === HTTP_STATUS.failed) {
		return (
			<div className="min-h-screen">
				<div>
					<span>{errorMsg || 'Failed to load wishlist'}</span>
					<br />
					<button type="button" onClick={() => dispatch(fetchWishlist())}>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<WishlistPageTmpl data={contents ?? {}} loading={status === HTTP_STATUS.pending} />
		</div>
	);
};

/** Page Layout. */
WishlistPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const page = {
		seo: {
			metaTitle: 'Wishlist',
			shareTitle: 'Wishlist',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default WishlistPage;
