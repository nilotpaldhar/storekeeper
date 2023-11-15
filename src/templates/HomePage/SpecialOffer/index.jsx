import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Image from '@ui/data-display/Image';
import StockProgress from '@templates/HomePage/SpecialOffer/StockProgress';
import OfferCountdown from '@templates/HomePage/SpecialOffer/OfferCountdown';

import { urlFor } from '@config/sanity';
import { createPermalink } from '@utils/product/permalink';
import clsx from 'clsx';

/** Checks offer status. */
const checkOfferStatus = (start, end) => {
	const currentTime = Date.parse(new Date());
	const startingTime = Date.parse(start);
	const endingTime = Date.parse(end);

	if (startingTime > currentTime) return 'comming_soon';
	if (endingTime > currentTime) return 'valid';
	return 'expired';
};

/**
 * Render the HomePageTmpl component.
 *
 * @return {Element} The HomePageTmpl component.
 */
const SpecialOffer = ({ data }) => {
	const router = useRouter();
	const currency = '$';

	const { title, description, price, thumbnail, product, date } = data;
	const imgSrc = urlFor(thumbnail).width(750).height(600).url();

	const originalPrice = price?.original ?? 0;
	const discountedPrice = price?.discount ?? 0;
	const savings = price?.saved ?? (originalPrice - discountedPrice)?.toFixed();

	const stockLeft = product?.inventory?.available || 0;
	const totalSales = product?.statistics?.orders || 0;
	const totalStock = stockLeft + totalSales;

	const [offerStatus, setOfferStatus] = useState(checkOfferStatus(date.start, date.end));
	const disabled = offerStatus === 'comming_soon' || offerStatus === 'expired';

	const handleClick = () => {
		const permalink = createPermalink(product.checId, product.slug);
		router.push(`/product/${permalink}`);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={disabled}
			className={clsx(
				'relative block w-full h-full bg-neutral-50 focus-visible:outline-dashed focus-visible:outline-2'
			)}
		>
			<div className="relative h-full py-6 md:py-8 text-neutral-900  max-w-xl mx-auto">
				<div className="px-4 md:px-6 max-w-max">
					<h3 className="text-2xl leading-snug font-bold">{title}</h3>
				</div>
				<div className="relative h-80 mt-8">
					<Image
						fill
						src={imgSrc}
						alt="Offer Image"
						sizes="(min-width: 1400px) 307px, (min-width: 1200px) 544px, (min-width: 1000px) 454px, (min-width: 780px) 576px, (min-width: 580px) 508px, calc(100vw - 32px)"
					/>
				</div>
				<div className="mt-4 px-4 sm:px-6">
					<div className="flex flex-col space-y-2 py-2">
						<p className="text-base font-semibold text-center">{description}</p>
						<div className="flex items-center justify-center space-x-2">
							<del className="block text-lg leading-none font-normal text-neutral-500">
								{currency}
								{originalPrice}
							</del>
							<ins className="block text-3xl leading-none font-extrabold no-underline text-red-600">
								{currency}
								{discountedPrice}
							</ins>
						</div>
					</div>
					<StockProgress
						className="mt-4"
						stockLeft={stockLeft}
						totalSales={totalSales}
						totalStock={totalStock}
					/>
					<div className="mt-5">
						<OfferCountdown
							endDate={date.end}
							status={offerStatus}
							onExpiry={() => setOfferStatus('expired')}
						/>
					</div>
				</div>
				<div className="absolute top-0 right-3 h-28 w-14 select-none bg-primary-600 text-white [clip-path:polygon(0%_0%,100%_0%,100%_100%,50%_80%,0%_100%)]">
					<div className="h-full flex flex-col items-center justify-center px-2 pb-2 text-center space-y-1.5">
						<span className="font-normal text-[10px] leading-none">Save</span>
						<span className="text-base font-extrabold leading-none">
							{currency}
							{savings}
						</span>
					</div>
				</div>
			</div>
		</button>
	);
};

/**
 * Default Props.
 */
SpecialOffer.defaultProps = {};

/**
 * Prop Types.
 */
SpecialOffer.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		price: PropTypes.shape({
			original: PropTypes.number,
			discount: PropTypes.number,
			saved: PropTypes.number,
		}),
		product: PropTypes.shape({
			checId: PropTypes.string,
			slug: PropTypes.string,
			inventory: PropTypes.shape({
				available: PropTypes.number,
			}),
			statistics: PropTypes.shape({
				orders: PropTypes.number,
			}),
		}),
		date: PropTypes.shape({
			start: PropTypes.string,
			end: PropTypes.string,
		}),
		thumbnail: PropTypes.shape({}),
	}).isRequired,
};

export default SpecialOffer;
