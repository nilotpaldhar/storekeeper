import PropTypes from 'prop-types';

/** Components & Plugins. */
import ImgRenderer from '@ui/commerce/ProductImgGallery/ImgRenderer';
import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

/** Styles. */
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

/**
 * Render the ProductImgGallery component.
 *
 * @return {Element} The ProductImgGallery component.
 */
const ProductImgGallery = ({ gallery, thumbnailsSize, thumbnailsGap }) => {
	const backgroundColor = 'transparent';
	const lightboxConf = {
		slides: gallery,
		plugins: [Inline, Thumbnails],
		thumbnails: {
			border: 0,
			padding: 0,
			vignette: false,
			borderRadius: 0,
			imageFit: 'cover',
			gap: thumbnailsGap,
			width: thumbnailsSize?.width,
			height: thumbnailsSize?.height,
		},
		inline: {
			className: 'w-full aspect-square',
		},
		carousel: {
			spacing: 0,
			padding: 0,
			imageFit: 'cover',
		},
		styles: {
			thumbnail: { backgroundColor },
			container: { backgroundColor },
			thumbnailsContainer: {
				padding: '0',
				backgroundColor,
				paddingTop: '12px',
			},
		},
	};

	return (
		<div className="max-w-full">
			<Lightbox
				render={{
					buttonPrev: () => null,
					buttonNext: () => null,
					slide: ({ rect: { width, height } = {}, slide: { src, alt } = {} }) => (
						<ImgRenderer src={src} alt={alt} width={width} height={height} />
					),
					thumbnail: ({ rect: { width, height } = {}, slide: { src, alt } = {} }) => (
						<ImgRenderer src={src} alt={alt} width={width} height={height} />
					),
				}}
				{...lightboxConf}
			/>
		</div>
	);
};

/**
 * Default Props.
 */
ProductImgGallery.defaultProps = {
	gallery: [],
	thumbnailsSize: {
		width: 100,
		height: 100,
	},
	thumbnailsGap: 8,
};

/**
 * Prop Types.
 */
ProductImgGallery.propTypes = {
	gallery: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string,
			alt: PropTypes.string,
			width: PropTypes.number,
			height: PropTypes.number,
		})
	),
	thumbnailsSize: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number,
	}),
	thumbnailsGap: PropTypes.number,
};

export default ProductImgGallery;
