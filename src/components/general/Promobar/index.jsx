import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';
import Container from '@ui/general/Container';

/** Icons. */
import CloseIcon from '@icons/regular/Close';

/** Constants. */
import { PROMO_BANNER_KEY } from '@constants';

/** Hooks. */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@hooks/useStorage';

/** Helpers. */
import clsx from 'clsx';
import trimSlashes from '@utils/general/trimSlashes';
import isDateExpired from '@utils/general/isDateExpired';

/**
 * Render the Promobar component.
 *
 * @return {Element} The Promobar component.
 */
const Promobar = ({ text, link, enabled, expiry, displayLocation, className, ...props }) => {
	const [show, setShow] = useState(false);
	const isHome = useRouter().asPath === '/';
	const defaultValue = { closed: false, expiry };
	const isExpired = Boolean(expiry) && isDateExpired(expiry);
	const [{ closed } = {}, setValue, removeValue] = useLocalStorage(PROMO_BANNER_KEY, defaultValue);

	useEffect(() => {
		if (!isExpired) setShow(enabled && text && !closed);
		if (isExpired) removeValue();
	}, [enabled, text, closed, isExpired, removeValue]);

	const handleClose = () => {
		setValue({ ...defaultValue, closed: true });
		setShow(false);
	};

	/** Link. */
	const linkTitle = link?.title;
	const linkHref = `/${trimSlashes(link?.href?.current ?? link?.href)}`;

	/** Hide if displayLocation set to "home" and we're not on the "homepage". */
	if (displayLocation === 'home' && !isHome) return null;

	// flex items-center space-x-2

	return show ? (
		<div className={clsx('w-full overflow-hidden bg-primary-600 text-white', className)} {...props}>
			<Container className="flex items-center py-2 selection:bg-white selection:text-primary-600">
				<div className="flex-1 flex items-center pr-8 lg:justify-center lg:text-center lg:px-10">
					<p className="">
						<span className="font-normal">{text}</span>
						{linkTitle && linkHref && (
							<Anchor
								href={linkHref}
								className="inline-block ml-2 min-w-max underline font-semibold text-white hover:text-white hover:opacity-90 focus-visible:outline-neutral-300"
							>
								{linkTitle}
							</Anchor>
						)}
					</p>
				</div>
				<button
					type="button"
					onClick={handleClose}
					aria-label="Close Promotion Bar"
					className="flex items-center h-full text-white hover:text-white hover:opacity-90 focus-visible:outline-neutral-300"
				>
					<CloseIcon className="!text-lg inline-block" />
					<span className="sr-only">Close Promotion Bar</span>
				</button>
			</Container>
		</div>
	) : null;
};

/**
 * Default Props.
 */
Promobar.defaultProps = {
	link: {},
	text: '',
	expiry: '',
	className: '',
	enabled: false,
	displayLocation: 'home',
};

/**
 * Prop Types.
 */
Promobar.propTypes = {
	text: PropTypes.string,
	enabled: PropTypes.bool,
	expiry: PropTypes.string,
	className: PropTypes.string,
	displayLocation: PropTypes.oneOf(['all', 'home']),
	link: PropTypes.shape({
		title: PropTypes.string,
		href: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
	}),
};

export default Promobar;
