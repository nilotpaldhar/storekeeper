import PropTypes from 'prop-types';

/** Components. */
import Tabs from '@ui/data-display/Tabs';
import Container from '@ui/general/Container';
import ProductSpecs from '@ui/commerce/ProductSpecs';
import ProductContent from '@ui/commerce/ProductContent';
import ProductImgGallery from '@ui/commerce/ProductImgGallery';
import ProductCollection from '@ui/commerce/ProductCollection';
import { PortableText } from '@portabletext/react';

/**
 * Render the ProductPageTmpl component.
 *
 * @return {Element} The ProductPageTmpl component.
 */
const ProductPageTmpl = ({ data }) => {
	/** Images Gallery. */
	const imgGallery = data?.gallery?.map((img) => ({
		width: 800,
		height: 800,
		src: img?.url,
		alt: data?.displayName ?? data?.name,
	}));

	/** Tabs Items. */
	const getTabsItems = () => {
		const tabsItems = [];

		if (data?.description?.length > 0) {
			tabsItems.push({
				key: 'product_desc',
				label: <span>Description</span>,
				children: (
					<div className="prose-sm md:prose prose-neutral md:max-w-none">
						<PortableText value={data?.description} />
					</div>
				),
			});
		}

		if (data?.additionalInfo?.length > 0) {
			tabsItems.push({
				key: 'product_additional_info',
				label: <span>Additional Information</span>,
				children: (
					<div>
						<ProductSpecs list={data?.additionalInfo ?? []} />
					</div>
				),
			});
		}

		return tabsItems;
	};

	return (
		<main className="py-10 lg:py-14">
			<Container className="flex flex-col space-y-14 lg:space-y-20">
				<section className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
					<div className="w-full lg:max-w-md xxl:max-w-lg shrink-0">
						<ProductImgGallery
							thumbnailsGap={8}
							gallery={imgGallery}
							thumbnailsSize={{
								width: 90,
								height: 90,
							}}
						/>
					</div>
					<div className="py-1">
						<ProductContent
							sku={data?.sku}
							excerpt={data?.excerpt}
							productId={data?.checId}
							inventory={data?.inventory}
							categories={data?.categories}
							variants={data?.variants || []}
							title={data?.displayName ?? data?.name}
							price={data?.price?.formattedWithSymbol}
						/>
					</div>
				</section>
				{(data?.description?.length > 0 || data?.additionalInfo?.length > 0) && (
					<section>
						<Tabs contentClassName="p-6 lg:p-8" items={getTabsItems()} />
					</section>
				)}
				<section>
					<ProductCollection
						products={data?.relatedProducts}
						wrapperClassName="!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 xxl:!grid-cols-5"
					>
						<ProductCollection.Title align="center" className="!p-0 mb-8 border-none">
							You May Also Like
						</ProductCollection.Title>
					</ProductCollection>
				</section>
			</Container>
		</main>
	);
};

/**
 * Prop Types.
 */
ProductPageTmpl.propTypes = {
	data: PropTypes.shape({
		sku: PropTypes.string,
		name: PropTypes.string,
		checId: PropTypes.string,
		excerpt: PropTypes.string,
		displayName: PropTypes.string,
		price: PropTypes.shape({
			raw: PropTypes.number,
			formatted: PropTypes.string,
			formattedWithCode: PropTypes.string,
			formattedWithSymbol: PropTypes.string,
		}),
		inventory: PropTypes.shape({
			available: PropTypes.number,
			isManaged: PropTypes.bool,
		}),
		categories: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				slug: PropTypes.string,
				title: PropTypes.string,
			})
		),
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
		gallery: PropTypes.arrayOf(PropTypes.shape({})),
		variants: PropTypes.arrayOf(PropTypes.shape({})),
		description: PropTypes.arrayOf(PropTypes.shape({})),
		additionalInfo: PropTypes.arrayOf(PropTypes.shape({})),
		relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
};

export default ProductPageTmpl;
