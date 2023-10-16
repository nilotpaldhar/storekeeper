import PropTypes from 'prop-types';

import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';

import WishlistCardRemove from '@ui/commerce/WishlistCard/Remove';
import WishlistCardAction from '@ui/commerce/WishlistCard/Action';

import { createPermalink } from '@utils/product/permalink';
import { clsx } from 'clsx';

/**
 * Render the WishlistCard component.
 *
 * @return {Element} The WishlistCard component.
 */
const WishlistCard = ({ data, className }) => {
	const title = data?.displayName ?? data?.name;
	const permalink = createPermalink(data?.checId, data?.slug);
	const href = permalink ? `/product/${permalink}` : null;
	const anchorProps = { href, target: '_blank', rel: 'noopener noreferrer' };
	const categories = data?.categories?.map((c) => c?.title)?.join(' / ');

	return (
		<article
			className={clsx('group max-w-[400px] border border-neutral-100 overflow-hidden', className)}
		>
			<div className="relative">
				<Anchor
					{...anchorProps}
					className="flex justify-center items-center focus-visible:outline-none bg-neutral-50"
				>
					<Image src={data?.image?.url} alt={title} width={400} height={400} />
				</Anchor>
				<div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
					<WishlistCardRemove />
				</div>
			</div>
			<div className="text-neutral-900 px-2 md:px-5 pt-3 sm:pt-4 py-2 text-center overflow-hidden">
				<p className="text-xs font-bold text-neutral-500 truncate">{categories || 'Unknown'}</p>
				<h2 title={title} className="text-sm my-1">
					<Anchor
						className="block w-full font-medium text-current truncate hover:text-current focus-visible:outline-dashed"
						{...anchorProps}
					>
						{title}
					</Anchor>
				</h2>
				<p className="font-bold text-sm mb-4">
					<data value={data?.price?.raw}>{data?.price?.formattedWithSymbol}</data>
				</p>
				<div role="separator" className="h-px w-full bg-neutral-100" />
				<div className="mt-2">
					<WishlistCardAction
						title={title}
						price={data?.price}
						variants={data?.variants}
						thumbnail={data?.image?.url}
					/>
				</div>
			</div>
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
		checId: PropTypes.string,
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
