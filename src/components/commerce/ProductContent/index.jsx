import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

/** Components & Icons. */
import Alert from '@ui/feedback/Alert';
import Anchor from '@ui/general/Anchor';
import LoadingUI from '@ui/feedback/LoadingUI';
import ReadMoreLess from '@ui/data-display/ReadMoreLess';
import ProductContMeta from '@ui/commerce/ProductContent/ProductContMeta';
import DashIcon from '@icons/regular/Dash';

import checkInventory from '@utils/product/checkInventory';

const ProductContRating = dynamic(() => import('@ui/commerce/ProductContent/ProductContRating'));
const ProductContActions = dynamic(() => import('@ui/commerce/ProductContent/ProductContActions'));

/**
 * Render the ProductContent component.
 *
 * @return {Element} The ProductContent component.
 */
const ProductContent = ({
	productId,
	title,
	price,
	excerpt,
	sku,
	categories,
	inventory,
	variants,
}) => {
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [stockStatus, setStockStatus] = useState('');
	const [updatedInventory, setUpdatedInventory] = useState(null);

	/** Check inventory status. */
	const fetchInventory = useCallback(async () => {
		setLoading(true);
		const data = await checkInventory(productId);

		setLoading(false);
		setStockStatus(data.status);
		setUpdatedInventory(data.inventory);
		setErrorMsg(data.error);
	}, [productId]);

	useEffect(() => {
		fetchInventory();
	}, [fetchInventory]);

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
				<LoadingUI loading={loading || !stockStatus} height={60}>
					{errorMsg && <Alert type="error">{errorMsg}</Alert>}
					{stockStatus === 'OUT_OF_STOCK' && (
						<div className="flex flex-col space-y-1 text-error-600">
							<h2 className="text-xl lg:text-2xl font-semibold leading-normal">Sold Out</h2>
							<p className="text-sm lg:text-base font-light">This item is currently out of stock</p>
						</div>
					)}
					{stockStatus === 'IN_STOCK' && (
						<ProductContActions
							productId={productId}
							inventory={updatedInventory || inventory}
							variants={variants}
						/>
					)}
				</LoadingUI>
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
	productId: PropTypes.string.isRequired,
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
