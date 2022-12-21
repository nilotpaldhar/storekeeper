import PropTypes from 'prop-types';
import NextImage from 'next/image';
import clsx from 'clsx';

/**
 * Render the Image component.
 *
 * @return {Element} The Image component.
 */
const Image = ({ src, alt, placeholder, className, ...props }) => {
	/** Image config. */
	const nextConf = {
		src,
		alt,
		placeholder,
		priority: true,
		className: clsx('select-none object-contain', className),
		...props,
	};

	return <NextImage {...nextConf} />;
};

/**
 * Default Props.
 */
Image.defaultProps = {
	placeholder: 'empty',
	className: '',
};

/**
 * Prop Types.
 */
Image.propTypes = {
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	alt: PropTypes.string.isRequired,
	placeholder: PropTypes.oneOf(['empty', 'blur']),
	className: PropTypes.string,
};

export default Image;
