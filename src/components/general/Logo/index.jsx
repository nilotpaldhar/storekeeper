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
		'py-1 border border-transparent transition focus-visible:outline-none focus-visible:border-primary-600 focus-visible:rounded',
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
