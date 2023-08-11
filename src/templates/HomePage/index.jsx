import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import CollectionSection from '@templates/HomePage/CollectionSection';
import CategoriesSection from '@templates/HomePage/CategoriesSection';

/**
 * Render the HomePageTmpl component.
 *
 * @return {Element} The HomePageTmpl component.
 */
const HomePageTmpl = ({ categories, collection }) => {
	const { topRatedProducts, newProducts } = collection;

	return (
		<main>
			<Container>
				<CategoriesSection
					title={categories?.title}
					collection={categories?.collection}
					hidden={categories?.hidden}
				/>
				<CollectionSection collection={topRatedProducts} />
				<CollectionSection collection={newProducts} />
			</Container>
		</main>
	);
};

/**
 * Prop Types.
 */
HomePageTmpl.propTypes = {
	categories: PropTypes.shape({
		title: PropTypes.string,
		collection: PropTypes.arrayOf(PropTypes.shape({})),
		hidden: PropTypes.bool,
	}).isRequired,
	collection: PropTypes.shape({
		topRatedProducts: PropTypes.shape({}),
		newProducts: PropTypes.shape({}),
	}).isRequired,
};

export default HomePageTmpl;
