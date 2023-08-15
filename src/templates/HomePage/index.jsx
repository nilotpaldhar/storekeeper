import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import OfferCard from '@ui/commerce/OfferCard';
import ProductCard from '@ui/commerce/ProductCard';
import BannerSlider from '@ui/commerce/BannerSlider';

import InfoSection from '@templates/HomePage/InfoSection';
import CollectionSection from '@templates/HomePage/CollectionSection';
import CategoriesSection from '@templates/HomePage/CategoriesSection';
import NewsletterSection from '@templates/HomePage/NewsletterSection';

// Temp
const PlaceHolderDeal = () => (
	<div className="bg-neutral-50 p-4 text-xl h-full min-h-[600px]">Deal Card</div>
);

/**
 * Render the HomePageTmpl component.
 *
 * @return {Element} The HomePageTmpl component.
 */
const HomePageTmpl = ({ banners, categories, offers, collection }) => {
	const { topRatedProducts, newProducts, featuredProducts } = collection;

	return (
		<main>
			{!banners?.hidden && banners?.collection?.length > 0 && (
				<section className="">
					<BannerSlider items={banners?.collection} />
				</section>
			)}

			<Container>
				<CategoriesSection
					title={categories?.title}
					collection={categories?.collection}
					hidden={categories?.hidden}
				/>

				{!offers?.hidden && offers?.collection?.length > 0 && (
					<section className="py-10 xl:py-14">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
							{offers.collection.map((offer) => (
								<div key={offer.id}>
									<OfferCard data={offer} />
								</div>
							))}
						</div>
					</section>
				)}

				<CollectionSection collection={topRatedProducts} />

				<section className="py-10 xl:py-14">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
						<div className="row-span-2 col-span-2 md:col-span-3 lg:col-span-2 xxl:col-span-1">
							{/* Deal of the day will go here */}
							<PlaceHolderDeal />
						</div>
						{!featuredProducts?.hidden &&
							featuredProducts.products.map((product) => (
								<div key={product.id}>
									<ProductCard data={product} />
								</div>
							))}
					</div>
				</section>

				<CollectionSection collection={newProducts} />
			</Container>
			<NewsletterSection />
			<InfoSection />
		</main>
	);
};

/**
 * Prop Types.
 */
HomePageTmpl.propTypes = {
	banners: PropTypes.shape({
		hidden: PropTypes.bool,
		collection: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
	categories: PropTypes.shape({
		title: PropTypes.string,
		collection: PropTypes.arrayOf(PropTypes.shape({})),
		hidden: PropTypes.bool,
	}).isRequired,
	offers: PropTypes.shape({
		hidden: PropTypes.bool,
		collection: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
	collection: PropTypes.shape({
		topRatedProducts: PropTypes.shape({}),
		newProducts: PropTypes.shape({}),
		featuredProducts: PropTypes.shape({
			hidden: PropTypes.bool,
			products: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
				})
			),
		}),
	}).isRequired,
};

export default HomePageTmpl;
