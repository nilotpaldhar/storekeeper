import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';

/**
 * Render the Link component.
 *
 * @return {Element} The Link component.
 */
const Link = forwardRef((props, ref) => {
	const { href, external, newWindow, children, ...rest } = props;

	/** Link config */
	const linkConf = {
		ref,
		href,
		target: newWindow ? '_black' : undefined,
		rel: newWindow ? 'noopener noreferrer' : undefined,
		...rest,
	};

	if (external) {
		return <a {...linkConf}>{children}</a>;
	}

	return <NextLink {...linkConf}>{children}</NextLink>;
});

/**
 * Default Props.
 */
Link.defaultProps = {
	children: '',
	newWindow: false,
	external: false,
};

/**
 * Prop Types.
 */
Link.propTypes = {
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	external: PropTypes.bool,
	newWindow: PropTypes.bool,
	children: PropTypes.node,
};

export default Link;
