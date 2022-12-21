import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';
import Badge from '@ui/data-display/Badge';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the HeaderIcon component.
 *
 * @return {Element} The HeaderIcon component.
 */
const HeaderIcon = forwardRef(
	({ href, title, icon: Icon, count, elementType, className, ...props }, forwardedRef) => {
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
			<span className="sr-only lg:not-sr-only text-[10px] font-semibold uppercase text-current leading-none">
				{title}
			</span>
		);

		if (!href || elementType === 'button') {
			return (
				<button ref={forwardedRef} type="button" className={classNames} {...props}>
					{iconSymbol}
					{title && iconTitle}
				</button>
			);
		}

		return (
			<Anchor ref={forwardedRef} href={href} className={classNames} {...props}>
				{iconSymbol}
				{title && iconTitle}
			</Anchor>
		);
	}
);

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
