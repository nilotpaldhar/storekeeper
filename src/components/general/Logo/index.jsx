import PropTypes from 'prop-types';
import Link from '@ui/general/Link';
import Image from '@ui/general/Image';
import clsx from 'clsx';

/**
 * Render the Logo component.
 *
 * @return {Element} The Logo component.
 */
const Logo = ({ href, src, alt, width, height, className, ...props }) => {
	const classNames = clsx(
		'border rounded border-transparent p-1 transition focus:outline-0 focus:border-primary-600',
		className
	);

	return (
		<Link href={href} className={classNames} {...props}>
			<Image src={src} alt={alt} width={width} height={height} />
		</Link>
	);
};

/**
 * Default Props.
 */
Logo.defaultProps = {
	alt: 'Site Logo',
	width: 150,
	height: 20,
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
	className: PropTypes.string,
};

export default Logo;
