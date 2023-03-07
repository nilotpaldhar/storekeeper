import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import ProductCardAction from '@ui/commerce/ProductCard/ProductCardAction';

/** Helpers & Styles. */
import { createPermalink } from '@utils/product/permalink';
import useToggle from '@hooks/useToggle';
import truncateStr from '@utils/general/truncateStr';
import styles, {
	thumbnailStyles,
	contentStyles,
	titleStyles,
	priceStyles,
} from '@ui/commerce/ProductCard/styles.cva';

/**
 * Render the ProductCard component.
 *
 * @return {Element} The ProductCard component.
 */
const ProductCard = ({ data, layout, className }) => {
	const [open, toggleOpen] = useToggle(false);

	const title = data?.displayName ?? data?.name;
	const permalink = createPermalink(data?.checId, data?.slug);
	const href = permalink ? `/product/${permalink}` : null;
	const categories = data?.categories?.map((c) => c?.title)?.join(' / ');
	const excerpt = truncateStr(data?.excerpt, 150);
	const anchorProps = { href, target: '_blank', rel: 'noopener noreferrer' };

	return (
		<article
			onMouseEnter={toggleOpen}
			onMouseLeave={toggleOpen}
			className={styles({ className, layout })}
		>
			<div className={thumbnailStyles({ layout })}>
				<Anchor className="block focus-visible:outline-none" {...anchorProps} tabIndex="-1">
					<Image src={data?.image?.url} alt={title} width={400} height={400} />
				</Anchor>
				<ProductCardAction open={open} />
			</div>
			<div className={contentStyles({ layout })}>
				<p className="text-xs font-bold truncate text-neutral-500">{categories || 'Unknown'}</p>
				<h2 className={titleStyles({ layout })} title={title}>
					<Anchor
						className="block w-full font-medium text-current truncate hover:text-current focus-visible:outline-dashed"
						{...anchorProps}
					>
						{title}
					</Anchor>
				</h2>
				{layout === 'horizontal' && excerpt && (
					<p className="hidden my-1 text-xs leading-relaxed md:block md:text-sm md:my-2">
						{excerpt}
					</p>
				)}
				<p className={priceStyles({ layout })}>
					<data value={data?.price?.raw}>{data?.price?.formattedWithSymbol}</data>
				</p>
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
	}).isRequired,
	layout: PropTypes.oneOf(['vertical', 'horizontal']),
	className: PropTypes.string,
};

export default ProductCard;
