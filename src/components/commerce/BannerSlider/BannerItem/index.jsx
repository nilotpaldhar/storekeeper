import PropTypes from 'prop-types';

/** Components. */
import Image from '@ui/data-display/Image';
import Container from '@ui/general/Container';
import BannerContent from '@ui/commerce/BannerSlider/BannerItem/BannerContent';

/** Styles & Helpers. */
import { urlFor } from '@config/sanity';
import styles, {
	contentWrapperOuter,
	contentWrapperInner,
	contentBlock,
	imgBlock,
} from '@ui/commerce/BannerSlider/BannerItem/styles.cva';

/**
 * Render the BannerItem component.
 *
 * @return {Element} The BannerItem component.
 */
const BannerItem = ({ data, className, ...props }) => {
	const { title, desc, price, link, thumbnail, backdrop, contentAlignment } = data;
	const thumbnailSrc = urlFor(thumbnail).width(600).height(600).url();
	const backdropSrc = backdrop ? urlFor(backdrop).width(1500).height(600).url() : null;

	return (
		<div className={styles({ className })} {...props}>
			<div className={contentWrapperOuter()}>
				<Container className={contentWrapperInner()}>
					<div className={contentBlock({ alignment: contentAlignment })}>
						<BannerContent title={title} desc={desc} price={price} link={link} />
					</div>
					<div className={imgBlock({ alignment: contentAlignment })}>
						<Image priority width={600} height={600} alt="Thumbnail" src={thumbnailSrc} />
					</div>
				</Container>
			</div>
			{backdropSrc ? (
				<Image fill priority src={backdropSrc} alt="Backdrop" className="object-cover" />
			) : (
				<div className="absolute inset-0 h-full w-full bg-gray-50" />
			)}
		</div>
	);
};

/**
 * Default Props.
 */
BannerItem.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
BannerItem.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		desc: PropTypes.string,
		link: PropTypes.shape({
			text: PropTypes.string,
			resource: PropTypes.shape({
				type: PropTypes.oneOf(['page', 'category', 'product']),
				slug: PropTypes.string,
				checId: PropTypes.string,
			}),
		}),
		price: PropTypes.shape({
			prefix: PropTypes.string,
			amount: PropTypes.number,
		}),
		backdrop: PropTypes.shape({}),
		thumbnail: PropTypes.shape({}),
		contentAlignment: PropTypes.oneOf(['left', 'right']),
	}).isRequired,
	className: PropTypes.string,
};

export default BannerItem;
