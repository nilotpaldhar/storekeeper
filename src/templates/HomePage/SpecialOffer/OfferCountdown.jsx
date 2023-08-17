import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

/** Custom renderer for Countdown component. */
const renderer = ({ formatted: { hours, minutes, seconds } }) => (
	<div className="flex items-center max-w-max space-x-6 text-neutral-900">
		<div className="relative font-semibold">
			<div className="flex flex-col space-y-1.5 items-center">
				<span className="block text-2xl leading-none p-3 bg-neutral-200">{hours}</span>
				<span className="block text-[10px] font-light leading-none uppercase">hours</span>
			</div>
			<span className="absolute top-2/4 -right-[15px] transform -translate-y-full block text-xl leading-none">
				:
			</span>
		</div>

		<div className="relative font-semibold">
			<div className="flex flex-col space-y-1.5 items-center">
				<span className="block text-2xl leading-none p-3 bg-neutral-200">{minutes}</span>
				<span className="block text-[10px] font-light leading-none uppercase">mins</span>
			</div>
			<span className="absolute top-2/4 -right-[15px] transform -translate-y-full block text-xl leading-none">
				:
			</span>
		</div>

		<div className="relative font-semibold">
			<div className="flex flex-col space-y-1.5 items-center">
				<span className="block text-2xl leading-none p-3 bg-neutral-200">{seconds}</span>
				<span className="block text-[10px] font-light leading-none uppercase">secs</span>
			</div>
		</div>
	</div>
);

/**
 * Render the OfferCountdown component.
 *
 * @return {Element} The OfferCountdown component.
 */
const OfferCountdown = ({ status, endDate, onExpiry }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<div>
			{status === 'comming_soon' && (
				<div className="text-base font-bold leading-relaxed text-neutral-900 text-center">
					Comming Soon!
				</div>
			)}
			{status === 'valid' && (
				<div className="flex flex-col items-center text-center">
					<p className="text-base font-semibold leading-relaxed text-neutral-700 mb-2">
						Hurry Up! Offer ends in:
					</p>
					<Countdown
						daysInHours
						zeroPadDays={2}
						renderer={renderer}
						date={Date.parse(endDate)}
						onComplete={() => {
							onExpiry();
						}}
					/>
				</div>
			)}
			{status === 'expired' && (
				<div className="text-base font-bold leading-relaxed text-neutral-900 text-center">
					Offer Expired!
				</div>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
OfferCountdown.defaultProps = {
	onExpiry: () => {},
};

/**
 * Prop Types.
 */
OfferCountdown.propTypes = {
	status: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired,
	onExpiry: PropTypes.func,
};

export default OfferCountdown;
