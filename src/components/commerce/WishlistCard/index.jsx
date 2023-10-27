import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeWishlistItem } from '@store/slices/wishlistOps/wishlistOps.thunks';
import { selectIsPending } from '@store/slices/wishlistOps/wishlistOps.selectors';

import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import BlockUI from '@ui/feedback/BlockUI';

import RemoveBtn from '@ui/commerce/WishlistCard/RemoveBtn';
import MoveToCart from '@ui/commerce/WishlistCard/MoveToCart';

import { clsx } from 'clsx';
import { createPermalink } from '@utils/product/permalink';

/**
 * Render the WishlistCard component.
 *
 * @return {Element} The WishlistCard component.
 */
const WishlistCard = ({ data, className }) => {
	const dispatch = useDispatch();
	const block = useSelector((state) => selectIsPending(state, data?.sanityId));

	/** Remove product from wishlist */
	const handleRemove = useCallback(() => {
		dispatch(removeWishlistItem(data?.sanityId));
	}, [data?.sanityId, dispatch]);

	const title = data?.displayName ?? data?.name;
	const permalink = createPermalink(data?.checId, data?.slug);
	const href = permalink ? `/product/${permalink}` : null;
	const anchorProps = { href, target: '_blank', rel: 'noopener noreferrer' };
	const categories = data?.categories?.map((c) => c?.title)?.join(' / ');

	return (
		<article className={clsx('group border border-neutral-100 overflow-hidden', className)}>
			<BlockUI blocking={block}>
				<div className="relative">
					<div
						className={clsx(
							'absolute top-2.5 right-2.5 transition duration-300',
							'hover-hover:opacity-0 hover-hover:pointer-events-none hover-hover:scale-75',
							'group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100',
							'group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100'
						)}
					>
						<RemoveBtn onRemove={handleRemove} />
					</div>
					<Anchor
						className="flex justify-center items-center focus-visible:outline-none bg-neutral-50"
						{...anchorProps}
					>
						<Image src={data?.image?.url} alt={title} width={400} height={400} />
					</Anchor>
				</div>
				<div className="px-2 md:px-4 pt-2 md:pt-3 pb-2 overflow-hidden">
					<div className="flex flex-col space-y-1.5 text-center leading-normal">
						<p className="w-full text-xs font-normal text-neutral-500 truncate">
							{categories || 'Unknown'}
						</p>
						<h2 className="text-sm text-neutral-900" title={title}>
							<Anchor
								className="block w-full font-medium text-current truncate hover:text-current focus-visible:outline-dashed"
								{...anchorProps}
							>
								{title}
							</Anchor>
						</h2>
						<p className="text-sm font-medium text-neutral-900">
							<data value={data?.price?.raw}>{data?.price?.formattedWithSymbol}</data>
						</p>
					</div>
					<div className="border-t border-neutral-100 pt-2 mt-4">
						<MoveToCart
							title={title}
							price={data?.price}
							thumbnail={data?.image?.url}
							productIds={{
								sanity: data?.sanityId,
								chec: data?.checId,
							}}
							variants={data?.variants}
							onComplete={handleRemove}
						/>
					</div>
				</div>
			</BlockUI>
		</article>
	);
};

/**
 * Default Props.
 */
WishlistCard.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
WishlistCard.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		checId: PropTypes.string,
		sanityId: PropTypes.string,
		name: PropTypes.string,
		slug: PropTypes.string,
		displayName: PropTypes.string,
		excerpt: PropTypes.string,
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
		price: PropTypes.shape({
			raw: PropTypes.number,
			formattedWithSymbol: PropTypes.string,
		}),
		categories: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				slug: PropTypes.string,
				title: PropTypes.string,
			})
		),
		inventory: PropTypes.shape({
			isManaged: PropTypes.bool,
			available: PropTypes.number,
		}),
		variants: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
	className: PropTypes.string,
};

export default WishlistCard;
