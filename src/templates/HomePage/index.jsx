import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import CollectionSection from '@templates/HomePage/CollectionSection';

/**
 * Render the HomePageTmpl component.
 *
 * @return {Element} The HomePageTmpl component.
 */
const HomePageTmpl = ({ collection }) => {
	const { topRatedProducts, newProducts } = collection;

	return (
		<main>
			<Container>
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
	collection: PropTypes.shape({
		topRatedProducts: PropTypes.shape({}),
		newProducts: PropTypes.shape({}),
	}).isRequired,
};

export default HomePageTmpl;
