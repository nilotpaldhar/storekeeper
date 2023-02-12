/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import RegularButton from '@ui/buttons/RegularButton';
import { getClient } from '@config/commerce';
import fetchPage from '@libs/general/dynamic-page/fetchPage';
import { createPermalink } from '@utils/product/permalink';

const ProductsPage = ({ products }) => {
	const collection = products
		?.filter((p) => p?.categories?.[0]?.slug === 'headphone')
		?.map((p) => ({
			id: p?.id,
			img: p?.image?.url,
			href: `/product/${createPermalink(p?.id, p?.permalink)}`,
		}));

	return (
		<div className="py-10">
			<Container>
				<div className="grid grid-cols-3 gap-10">
					{collection?.map((product) => (
						<div className="flex flex-col" key={product?.id}>
							<img src={product?.img} alt="" className="w-full" />
							<RegularButton href={product?.href} as="anchor">
								View
							</RegularButton>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

ProductsPage.propTypes = {
	products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ProductsPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

export const getServerSideProps = async () => {
	const client = getClient({ useSecretKey: true });
	const data = await fetchPage(false, 'homepage');
	const products = await client.products.list();
	return { props: { data, products: products.data } };
};

export default ProductsPage;
