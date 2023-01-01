import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';

/** Helpers. */
import clsx from 'clsx';
import { urlFor } from '@config/sanity';

/**
 * Render the Logo component.
 *
 * @return {Element} The Logo component.
 */
const Logo = ({ href, src, alt, width, height, srcSanity, className, ...props }) => {
	const classNames = clsx(
		'py-1 border border-transparent transition focus-visible:outline-none focus-visible:border-primary-600 focus-visible:rounded',
		className
	);

	const logoSrc = srcSanity ? urlFor(src).url() : src;

	return (
		<Anchor href={href} className={classNames} {...props}>
			<Image src={logoSrc} alt={alt} width={width} height={height} />
		</Anchor>
	);
};

/**
 * Default Props.
 */
Logo.defaultProps = {
	alt: 'Site Logo',
	width: 150,
	height: 20,
	srcSanity: false,
	className: '',
};

/**
 * Prop Types.
 */
Logo.propTypes = {
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	alt: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	srcSanity: PropTypes.bool,
	className: PropTypes.string,
};

export default Logo;
