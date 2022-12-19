import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import Link from '@ui/general/Link';
import Badge from '@ui/utility/Badge';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the HeaderIcon component.
 *
 * @return {Element} The HeaderIcon component.
 */
const HeaderIcon = forwardRef((props, ref) => {
	const { href, title, icon: Icon, count, elementType, className, ...rest } = props;

	const classNames = clsx(
		'h-full flex flex-col items-center justify-center space-y-1 text-neutral-900 hover:text-current focus-visible:text-primary-600 focus-visible:outline-primary-600',
		className
	);
	const iconSymbol = (
		<Badge count={count} size="sm" offset={{ x: -8, y: -6 }}>
			<Icon className="!text-xl lg:!text-base" />
		</Badge>
	);
	const iconTitle = (
		<span className="hidden lg:inline-block text-[10px] font-bold uppercase text-current leading-none">
			{title}
		</span>
	);

	if (!href || elementType === 'button') {
		return (
			<button ref={ref} type="button" className={classNames} {...rest}>
				{iconSymbol}
				{title && iconTitle}
			</button>
		);
	}

	return (
		<Link ref={ref} href={href} className={classNames} {...rest}>
			{iconSymbol}
			{title && iconTitle}
		</Link>
	);
});

/**
 * Default Props.
 */
HeaderIcon.defaultProps = {
	href: null,
	title: null,
	count: 0,
	elementType: 'link',
	className: '',
};

/**
 * Prop Types.
 */
HeaderIcon.propTypes = {
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
	icon: PropTypes.elementType.isRequired,
	count: PropTypes.number,
	elementType: PropTypes.oneOf(['link', 'button']),
	className: PropTypes.string,
};

export default HeaderIcon;
