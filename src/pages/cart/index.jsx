import { useDispatch, useSelector } from 'react-redux';

import { HTTP_STATUS } from '@constants';
import { REQUEST_TYPES } from '@store/slices/cart';
import { fetchCart } from '@store/slices/cart/cart.thunks';
import * as cartSelector from '@store/slices/cart/cart.selectors';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/** Components & Templates. */
import Empty from '@ui/feedback/Empty';
import CartPageTmpl from '@templates/CartPage';
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import RegularButton from '@ui/buttons/RegularButton';
import ReloadIcon from '@icons/regular/Reload';

import errorImg from '@public/error.svg';

/**
 * Render the CartPage component.
 *
 * @return {Element} The CartPage component.
 */
const CartPage = () => {
	const dispatch = useDispatch();

	const status = useSelector(cartSelector.selectStatus);
	const contents = useSelector(cartSelector.selectContents);
	const requestType = useSelector(cartSelector.selectRequestType);
	const errorMsg = useSelector(cartSelector.selectError);

	if (status === HTTP_STATUS.idle) {
		return null;
	}

	if (
		status === HTTP_STATUS.failed &&
		(requestType === REQUEST_TYPES.FETCH_CART || requestType === REQUEST_TYPES.CLEAR_CART)
	) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Container>
					<Empty
						imgSrc={errorImg}
						imgProps={{ alt: 'fail', width: 200, height: 200, priority: true }}
						title={errorMsg || 'Failed to load cart'}
						description={null}
					>
						<RegularButton
							startIcon={ReloadIcon}
							className="px-8"
							onClick={() => dispatch(fetchCart())}
						>
							Try Again
						</RegularButton>
					</Empty>
				</Container>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<CartPageTmpl
				data={contents ?? {}}
				loading={
					status === HTTP_STATUS.pending &&
					(requestType === REQUEST_TYPES.FETCH_CART || requestType === REQUEST_TYPES.CLEAR_CART)
				}
				block={
					status === HTTP_STATUS.pending &&
					(requestType === REQUEST_TYPES.ADD_CART_DISCOUNT ||
						requestType === REQUEST_TYPES.REMOVE_CART_DISCOUNT)
				}
			/>
		</div>
	);
};

/** Page Layout. */
CartPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const page = {
		seo: {
			metaTitle: 'Shopping Cart',
			shareTitle: 'Shopping Cart',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default CartPage;
