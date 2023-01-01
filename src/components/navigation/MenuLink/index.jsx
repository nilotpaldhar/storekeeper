import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';

/** Helpers. */
import isValidUrl from '@utils/general/isValidUrl';
import trimSlashes from '@utils/general/trimSlashes';

/**
 * Render the MenuLink component.
 *
 * @return {Element} The MenuLink component.
 */
const MenuLink = forwardRef(({ data, elementType, ...props }, forwardedRef) => {
	/** Parse link href. */
	const parseHref = ({ type, href, page, isExternal, custom = false }) => {
		/** Type "Page". */
		if (type === 'navPage') {
			return page?.type === 'page' ? page?.slug?.current : page?.slug;
		}

		/** Type "Link". */
		if (type === 'navLink') {
			return (isExternal && isValidUrl(href)) || custom ? href : `/${href}`;
		}

		return null;
	};

	const linkHref = trimSlashes(parseHref(data));
	const external = data?.isExternal;
	const newWindow = data?.newWindow;

	/** Check if valid href. */
	if (elementType === 'link' && linkHref === null) {
		return null;
	}

	if (elementType === 'button') {
		return (
			<button type="button" ref={forwardedRef} {...props}>
				{data?.label}
			</button>
		);
	}

	return (
		<Anchor
			ref={forwardedRef}
			external={external}
			href={`/${linkHref}`}
			newWindow={newWindow}
			{...props}
		>
			{data?.label}
		</Anchor>
	);
});

/**
 * Default Props.
 */
MenuLink.defaultProps = {
	data: {},
	elementType: 'link',
};

/**
 * Prop Types.
 */
MenuLink.propTypes = {
	data: PropTypes.shape({
		type: PropTypes.oneOf(['navPage', 'navLink']),
		label: PropTypes.string,
		isExternal: PropTypes.bool,
		newWindow: PropTypes.bool,
		href: PropTypes.string,
		page: PropTypes.shape({}),
	}),
	elementType: PropTypes.oneOf(['link', 'button']),
};

export default MenuLink;
