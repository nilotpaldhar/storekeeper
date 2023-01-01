import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';

/** Constants. */
import { COOKIE_CONSENT_KEY } from '@constants';

/** Hooks. */
import { useState } from 'react';
import useTimeout from '@hooks/useTimeout';
import { useLocalStorage } from '@hooks/useStorage';

/** Helpers. */
import clsx from 'clsx';
import trimSlashes from '@utils/general/trimSlashes';

/**
 * Render the CookieConsent component.
 *
 * @return {Element} The CookieConsent component.
 */
const CookieConsent = ({ enabled, message, link, delay, className, ...props }) => {
	const [show, setShow] = useState(false);
	const defaultValue = { accepted: false, declined: false, responded: false };
	const [{ responded }, setValue] = useLocalStorage(COOKIE_CONSENT_KEY, defaultValue);

	useTimeout(() => {
		setShow(enabled && message && !responded);
	}, delay * 1000);

	const handleClick = (accept = false) => {
		setValue({
			declined: !accept,
			accepted: accept,
			responded: true,
		});
		setShow(false);
	};

	/** Link. */
	const linkTitle = link?.title;
	const linkHref = trimSlashes(link?.href);

	return show ? (
		<div
			className={clsx(
				'fixed z-[100] bg-white border rounded-sm shadow-lg right-0 bottom-0 w-full sm:right-10 sm:bottom-10 sm:w-96 border-neutral-50',
				className
			)}
			{...props}
		>
			<div className="p-4 sm:p-6 text-sm leading-relaxed text-neutral-900">
				<p className="text-center sm:text-left">{message}</p>
				{linkTitle && linkHref && (
					<p className="flex justify-center text-center sm:justify-start sm:text-left mt-1 space-x-1 font-medium">
						<span>Learn more about our</span>
						<Anchor
							href={linkHref}
							className="font-semibold underline focus-visible:outline-primary-600"
						>
							{linkTitle}
						</Anchor>
					</p>
				)}
				<div className="flex flex-col sm:flex-row items-center mt-4 space-y-1 sm:space-y-0 sm:space-x-1">
					<button
						type="button"
						aria-label="Decline Cookies"
						onClick={() => handleClick(false)}
						className="block w-full flex-1 p-1 text-sm font-normal bg-white border text-primary-600 border-primary-600"
					>
						Decline
					</button>
					<button
						type="button"
						aria-label="Accept Cookies"
						onClick={() => handleClick(true)}
						className="block w-full flex-1 p-1 text-sm font-normal text-white border bg-primary-600 border-primary-600 hover:text-white"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	) : null;
};

/**
 * Default Props.
 */
CookieConsent.defaultProps = {
	link: {},
	delay: 5, // 5 seconds
	message: '',
	className: '',
	enabled: false,
};

/**
 * Prop Types.
 */
CookieConsent.propTypes = {
	enabled: PropTypes.bool,
	delay: PropTypes.number,
	message: PropTypes.string,
	className: PropTypes.string,
	link: PropTypes.shape({
		title: PropTypes.string,
		href: PropTypes.string,
	}),
};

export default CookieConsent;
