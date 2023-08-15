import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import { PortableText } from '@portabletext/react';

/** Icons. */
import ArrowRightIcon from '@icons/regular/ArrowRight';

/** Helpers & Styles. */
import { urlFor } from '@config/sanity';
import createLinkHref from '@utils/general/createLinkHref';
import styles, {
	wrapper,
	contentBox,
	titleText,
	contentText,
	anchor,
} from '@ui/commerce/OfferCard/styles.cva';

/**
 * Render the OfferCard component.
 *
 * @return {Element} The OfferCard component.
 */
const OfferCard = ({ data, className, ...props }) => {
	const { title, content, contentAlignment, thumbnail, link } = data;
	const imgSrc = urlFor(thumbnail).width(500).height(250).url();
	const href = createLinkHref(link?.url?.type, {
		slug: link?.url?.slug,
		checId: link?.url?.checId,
	});

	return (
		<div className={styles({ className })} {...props}>
			{imgSrc && <Image src={imgSrc} alt="Offer Image" width={500} height={250} />}
			<div className={wrapper({ alignment: contentAlignment })}>
				<div className={contentBox()}>
					<h3 className={titleText()}>{title}</h3>
					<div className={contentText()}>
						<PortableText value={content} />
					</div>
					{href && (
						<Anchor href={href} className={anchor()}>
							<span className="inline-block text-sm font-medium">{link.text || 'Shop Now'}</span>
							<ArrowRightIcon className="!text-xs" />
						</Anchor>
					)}
				</div>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
OfferCard.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
OfferCard.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		content: PropTypes.arrayOf(PropTypes.shape({})),
		contentAlignment: PropTypes.oneOf(['left', 'right']),
		thumbnail: PropTypes.shape({}),
		link: PropTypes.shape({
			text: PropTypes.string,
			url: PropTypes.shape({
				type: PropTypes.oneOf(['page', 'category', 'product']),
				slug: PropTypes.string,
				checId: PropTypes.string,
			}),
		}),
	}).isRequired,
	className: PropTypes.string,
};

export default OfferCard;
