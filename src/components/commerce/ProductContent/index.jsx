import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Anchor from '@ui/general/Anchor';
import LoadingUI from '@ui/feedback/LoadingUI';
import ReadMoreLess from '@ui/data-display/ReadMoreLess';
import ProductContMeta from '@ui/commerce/ProductContent/ProductContMeta';
import DashIcon from '@icons/regular/Dash';

import createCanonicalUrl from '@utils/general/createCanonicalUrl';
import { useCallback } from 'react';

const ProductShare = dynamic(() => import('@ui/commerce/ProductShare'));
const ProductContRating = dynamic(() => import('@ui/commerce/ProductContent/ProductContRating'));
const ProductActions = dynamic(() => import('@ui/commerce/ProductActions'), {
	loading: () => <LoadingUI loading height={120} />,
});

/**
 * Render the ProductContent component.
 *
 * @return {Element} The ProductContent component.
 */
const ProductContent = ({ productIds, title, price, excerpt, sku, categories, variants }) => {
	const router = useRouter();

	const redirectToCart = useCallback(() => {
		router.push('/cart');
	}, [router]);

	return (
		<article>
			<h1 className="text-xl lg:text-2xl font-semibold leading-normal">{title}</h1>
			<div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:mt-6">
				<div className="order-2 sm:order-1 text-xl sm:text-2xl font-extrabold leading-none">
					{price}
				</div>
				<ProductContRating
					rating={4}
					reviewsCount={50}
					className="mb-4 order-1 sm:order-2 sm:mb-0 sm:ml-6"
				/>
			</div>
			{excerpt && (
				<div className="mt-4 sm:mt-6">
					<p className="text-base font-light leading-relaxed">
						<ReadMoreLess text={excerpt} limit={300} />
					</p>
				</div>
			)}
			<div className="py-8 my-8 border-y border-neutral-100">
				<ProductActions
					productIds={productIds}
					variants={variants}
					variantOrientation="horizontal"
					onSuccessAddToCart={redirectToCart}
				/>
			</div>
			<div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-4">
				<ProductContMeta title="SKU:">{<span>{sku}</span> || <DashIcon />}</ProductContMeta>
				<span role="separator" className="hidden sm:block w-px h-5 leading-none bg-neutral-200" />
				<ProductContMeta title="Categories:">
					{categories?.length > 0 ? (
						<ul className="flex flex-wrap items-center space-x-1">
							{categories?.map((category, idx) => (
								<li key={category?.id} className="flex items-center">
									<Anchor
										newWindow
										href={`/product/collection/${category?.slug}?query=${category?.slug}`}
										className="font-light underline text-neutral-900 hover:opacity-70 hover:text-current"
									>
										{category?.title}
									</Anchor>
									{idx + 1 !== categories?.length && <span>&#44;</span>}
								</li>
							))}
						</ul>
					) : (
						<DashIcon />
					)}
				</ProductContMeta>
			</div>
			<div className="mt-6 sm:mt-8">
				<ProductShare title={title} url={createCanonicalUrl(router?.asPath)} />
			</div>
		</article>
	);
};

/**
 * Default Props.
 */
ProductContent.defaultProps = {
	excerpt: '',
	sku: null,
	categories: [],
	inventory: {},
	variants: [],
};

/**
 * Prop Types.
 */
ProductContent.propTypes = {
	productIds: PropTypes.shape({}).isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	excerpt: PropTypes.string,
	sku: PropTypes.string,
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			slug: PropTypes.string,
			title: PropTypes.string,
		})
	),
	inventory: PropTypes.shape({
		available: PropTypes.number,
		isManaged: PropTypes.bool,
	}),
	variants: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductContent;
