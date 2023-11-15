import PropTypes from 'prop-types';

import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import RegularButton from '@ui/buttons/RegularButton';
import WishlistBtn from '@ui/commerce/ProductCard/WishlistBtn';

import CartIcon from '@icons/regular/Cart';
import UnorderedListIcon from '@icons/regular/UnorderedList';

import truncateStr from '@utils/general/truncateStr';
import { createPermalink } from '@utils/product/permalink';

import styles, {
	titleStyles,
	contentStyles,
	thubnailStyles,
	btnWrapperStyles,
	wishlistWrapperStyles,
} from './styles.cva';

/**
 * Render the ProductCard component.
 *
 * @return {Element} The ProductCard component.
 */
const ProductCard = ({ data, layout, className }) => {
	const title = data?.displayName ?? data?.name;
	const permalink = createPermalink(data?.checId, data?.slug);
	const href = permalink ? `/product/${permalink}` : null;
	const categories = data?.categories?.map((c) => c?.title)?.join(' / ');
	const excerpt = truncateStr(data?.excerpt, 150);
	const anchorProps = { href, target: '_blank', rel: 'noopener noreferrer' };
	const outOfStock = data?.inventory?.isManaged && data?.inventory?.available <= 0;
	const hasVariants = data?.variants?.length > 0;

	return (
		<article className={styles({ className, layout })}>
			<div className={thubnailStyles({ layout })}>
				<div className={wishlistWrapperStyles()}>
					<WishlistBtn id={data?.sanityId} />
				</div>
				<Anchor
					className="flex justify-center items-center focus-visible:outline-none bg-neutral-50"
					{...anchorProps}
				>
					<Image
						src={data?.image?.url ?? '/placeholder.png'}
						alt={title}
						width={400}
						height={400}
					/>
				</Anchor>
			</div>
			<div className="flex-1 px-2 md:px-4 pt-2 md:pt-3 pb-4 md:pb-5 overflow-hidden">
				<div className={contentStyles({ layout })}>
					<p className="w-full text-xs font-normal text-neutral-500 truncate">
						{categories || 'Unknown'}
					</p>
					<h2 className={titleStyles({ layout })} title={title}>
						<Anchor
							className="block w-full font-medium text-current truncate hover:text-current focus-visible:outline-dashed"
							{...anchorProps}
						>
							{title}
						</Anchor>
					</h2>
					{layout === 'horizontal' && excerpt && (
						<p className="hidden text-sm leading-relaxed md:block">{excerpt}</p>
					)}
					<p className="text-sm font-medium text-neutral-900">
						<data value={data?.price?.raw}>{data?.price?.formattedWithSymbol}</data>
					</p>
				</div>
				<div className={btnWrapperStyles({ layout })}>
					{outOfStock ? (
						<RegularButton fullWidth intent="dark-ghost" className="border border-red-600" disabled>
							<span className="text-xs uppercase text-red-600">Out of Stock</span>
						</RegularButton>
					) : (
						<RegularButton
							fullWidth
							as="anchor"
							intent="dark-ghost"
							className="border border-neutral-100"
							startIcon={hasVariants ? UnorderedListIcon : CartIcon}
							{...anchorProps}
						>
							<span className="block w-full truncate text-xs uppercase">
								{hasVariants ? 'Select Options' : 'Buy Now'}
							</span>
						</RegularButton>
					)}
				</div>
			</div>
		</article>
	);
};

/**
 * Default Props.
 */
ProductCard.defaultProps = {
	layout: 'vertical',
	className: '',
};

/**
 * Prop Types.
 */
ProductCard.propTypes = {
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
	layout: PropTypes.oneOf(['vertical', 'horizontal']),
	className: PropTypes.string,
};

export default ProductCard;
