import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/** Components. */
import Anchor from '@ui/general/Anchor';

/** Helpers. */
import isValidUrl from '@utils/general/isValidUrl';
import trimSlashes from '@utils/general/trimSlashes';
import { createPermalink } from '@utils/product/permalink';

/** Parse link href. */
const parseHref = ({ type, href, resource, isExternal, custom = false }) => {
	/** Type "Product" */
	if (type === 'navProduct') {
		return `/product/${createPermalink(resource.checId, resource.slug)}`;
	}

	/** Type "Category" */
	if (type === 'navCategory') {
		return `/product/collection/${resource.slug}?query=${resource.slug}`;
	}

	/** Type "Page" */
	if (type === 'navPage') {
		return `/${trimSlashes(resource.slug)}`;
	}

	/** Type "Link" */
	if (type === 'navLink') {
		return (isExternal && isValidUrl(href)) || custom ? href : `/${href}`;
	}

	return null;
};

/**
 * Render the MenuLink component.
 *
 * @return {Element} The MenuLink component.
 */
const MenuLink = forwardRef(({ data, elementType, ...props }, forwardedRef) => {
	const linkHref = parseHref(data);
	const external = !!data?.isExternal;
	const newWindow = !!data?.newWindow;

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
		<Anchor ref={forwardedRef} external={external} href={linkHref} newWindow={newWindow} {...props}>
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
		type: PropTypes.oneOf(['navPage', 'navProduct', 'navCategory', 'navLink']),
		label: PropTypes.string,
		href: PropTypes.string,
		newWindow: PropTypes.bool,
		isExternal: PropTypes.bool,
		resource: PropTypes.shape({}),
	}),
	elementType: PropTypes.oneOf(['link', 'button']),
};

export default MenuLink;
