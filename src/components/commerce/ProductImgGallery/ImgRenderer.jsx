import PropTypes from 'prop-types';
import Image from '@ui/data-display/Image';

/**
 * Render the ImgRenderer component.
 *
 * @return {Element} The ImgRenderer component.
 */
const ImgRenderer = ({ src, alt, width, height }) =>
	src ? <Image src={src} alt={alt ?? ''} width={width} height={height} loading="eager" /> : null;

/**
 * Default Props.
 */
ImgRenderer.defaultProps = {
	src: null,
	alt: null,
};

/**
 * Prop Types.
 */
ImgRenderer.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
};

export default ImgRenderer;
