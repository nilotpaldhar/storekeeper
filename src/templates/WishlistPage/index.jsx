import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

/** Components. */
import Empty from '@ui/feedback/Empty';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

import clsx from 'clsx';
import emptyCartImg from '@public/empty-cart.svg';

const LoadingUI = dynamic(() => import('@ui/feedback/LoadingUI'));
const WishlistCard = dynamic(() => import('@ui/commerce/WishlistCard'));

/**
 * Render the WishlistPageTmpl component.
 *
 * @return {Element} The WishlistPageTmpl component.
 */
const WishlistPageTmpl = ({ data, loading }) => (
	<main className={`py-10 lg:py-14 ${!data?.isEmpty ? 'min-h-screen' : ''}`}>
		<Container>
			<LoadingUI loading={loading}>
				{data?.isEmpty ? (
					<Empty
						className="py-24"
						imgSrc={emptyCartImg}
						title="Your wishlist is empty!"
						description={
							<span className="block text-center">
								Add items that you like to your wishlist. Review them anytime and easily move them
								to the cart.
							</span>
						}
					>
						<RegularButton as="anchor" href="/" className="px-8" startIcon={ArrowLeftIcon}>
							Continue Shopping
						</RegularButton>
					</Empty>
				) : (
					<div className="flex flex-col space-y-6 md:space-y-8">
						<h1 className="flex flex-wrap items-baseline leading-snug space-x-2 capitalize text-base font-normal">
							<span>My Wishlist</span>
							<span>&ndash;</span>
							<span>
								{data?.totalItems} {data?.totalItems > 1 ? 'Items' : 'Item'}
							</span>
						</h1>
						<div
							className={clsx(
								'grid grid-cols-2 gap-x-4 gap-y-6',
								'md:grid-cols-3 md:gap-x-4 md:gap-y-8',
								'lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10',
								'xl:grid-cols-5 xl:gap-x-8 xl:gap-y-12'
							)}
						>
							{data?.items?.map((item) => (
								<div key={item?.id}>
									<WishlistCard data={item} />
								</div>
							))}
						</div>
					</div>
				)}
			</LoadingUI>
		</Container>
	</main>
);

/**
 * Default Props.
 */
WishlistPageTmpl.defaultProps = {
	loading: false,
};

/**
 * Prop Types.
 */
WishlistPageTmpl.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		isEmpty: PropTypes.bool,
		totalItems: PropTypes.number,
		items: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
	loading: PropTypes.bool,
};

export default WishlistPageTmpl;
