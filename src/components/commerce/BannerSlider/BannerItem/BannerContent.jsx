import PropTypes from 'prop-types';

import RegularButton from '@ui/buttons/RegularButton';
import ArrowRightIcon from '@icons/regular/ArrowRight';

import createLinkHref from '@utils/general/createLinkHref';

/**
 * Render the BannerContent component.
 *
 * @return {Element} The BannerContent component.
 */
const BannerContent = ({ title, desc, link, price }) => {
	const href = createLinkHref(link?.resource?.type, {
		slug: link?.resource?.slug,
		checId: link?.resource?.checId,
	});

	return (
		<div className="text-neutral-900">
			<div className="flex flex-col space-y-4">
				<h1 className="text-2xl text-center font-black !leading-normal tracking-wider sm:text-3xl lg:text-left xl:text-4xl">
					{title}
				</h1>
				<p className="hidden text-sm text-center font-normal leading-relaxed lg:block lg:text-base lg:text-left">
					{desc}
				</p>
			</div>
			<div className="flex flex-col mt-6 select-none px-14 sm:px-0 sm:flex-row sm:justify-center sm:items-center lg:justify-start">
				<div className="flex items-end justify-center space-x-1 sm:ml-6 sm:order-2">
					<span className="text-xs font-light leading-none transform lg:-translate-y-1">
						{price.prefix}
					</span>
					<span className="text-2xl font-black text-primary-600 leading-none lg:text-3xl">
						${price.amount}
					</span>
				</div>
				{href && (
					<RegularButton
						as="anchor"
						href={href}
						startIcon={ArrowRightIcon}
						className="mt-4 px-4 sm:mt-0 sm:order-1 lg:px-8"
					>
						{link.text}
					</RegularButton>
				)}
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
BannerContent.defaultProps = {
	desc: '',
	link: { text: 'Know More' },
};

/**
 * Prop Types.
 */
BannerContent.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string,
	link: PropTypes.shape({
		text: PropTypes.string,
		resource: PropTypes.shape({
			type: PropTypes.oneOf(['page', 'category', 'product']),
			slug: PropTypes.string,
			checId: PropTypes.string,
		}),
	}),
	price: PropTypes.shape({
		prefix: PropTypes.string,
		amount: PropTypes.number,
	}).isRequired,
};

export default BannerContent;
