import PropTypes from 'prop-types';
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import fetchPage from '@libs/general/dynamic-page/fetchPage';

// Experimental
import { groq } from 'next-sanity';
import client from '@config/sanity';
import ProductCollection from '@ui/commerce/ProductCollection';
import LayoutGridIcon from '@icons/regular/LayoutGrid';
import LayoutListIcon from '@icons/regular/LayoutList';
import useToggle from '@hooks/useToggle';

const ProductsPage = ({ products }) => {
	const [asGrid, toggleAsGrid] = useToggle(true);

	return (
		<Container className="py-10">
			<ProductCollection
				grid={asGrid}
				products={products}
				wrapperClassName={
					asGrid ? '!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 xxl:!grid-cols-5' : ''
				}
			>
				<div className="flex justify-between items-center mb-8">
					<ProductCollection.Title align="left" className="!p-0 border-none">
						Products
					</ProductCollection.Title>
					<div className="flex items-center space-x-4">
						<button type="button" onClick={() => toggleAsGrid(false)}>
							<LayoutListIcon />
						</button>
						<button type="button" onClick={() => toggleAsGrid(true)}>
							<LayoutGridIcon />
						</button>
					</div>
				</div>
			</ProductCollection>
		</Container>
	);
};

ProductsPage.propTypes = {
	page: PropTypes.shape({
		title: PropTypes.string,
	}).isRequired,
	products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ProductsPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

export const getStaticProps = async ({ preview }) => {
	try {
		const data = await fetchPage(preview, 'shoppage');

		// Fetch products [experimental]
		const query = groq`
      *[_type == "product" && isActive == true] | order(_updatedAt desc) {
			  sku,
        name,
        slug,
        price,
        excerpt,
        inventory,
        "id": _id,
        displayName,
        "sanityId": _id,
        "checId": productID,
        categories[]->{ "id": _id, slug, title },
				"variants": variantGroups[]{
          id,
          name,
          options[]{ id, name, price, assets }
        },
        image {
          id,
          url,
          width,
          height,
          isImage,
          filename,
          fileSize,
          description,
          fileExtension
        }
		  }
	  `;
		const products = await client({
			useCdn: false,
			useToken: false,
		}).fetch(query);

		return { props: { data, products } };
	} catch (error) {
		return { notFound: true };
	}
};

export default ProductsPage;
