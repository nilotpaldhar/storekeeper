import PropTypes from 'prop-types';

import Carousel from '@ui/general/Carousel';
import Container from '@ui/general/Container';
import InfoItem from '@templates/HomePage/InfoSection/InfoItem';

import GiftcardIcon from '@icons/regular/Giftcard';
import MoneyBillIcon from '@icons/regular/MoneyBill';
import ShieldCheckIcon from '@icons/regular/ShieldCheck';
import TruckDeliveryIcon from '@icons/regular/TruckDelivery';
import CustomerServiceIcon from '@icons/regular/CustomerService';

import { nanoid } from 'nanoid';
import clsx from 'clsx';

/**
 * Render the InfoSection component.
 *
 * @return {Element} The InfoSection component.
 */
const InfoSection = ({ items, className, ...props }) => {
	const breakpoints = [
		{
			breakpoint: 360,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			},
		},
	];

	return (
		<section className={clsx('py-8 xl:py-10', className)} {...props}>
			<Container className="">
				<Carousel slidesToShow={4} breakpoints={breakpoints}>
					{items.map(({ id, icon, title, desc }) => (
						<InfoItem key={id} icon={icon} title={title} desc={desc} />
					))}
				</Carousel>
			</Container>
		</section>
	);
};

/**
 * Default Props.
 */
InfoSection.defaultProps = {
	items: [
		{
			id: nanoid(),
			icon: TruckDeliveryIcon,
			title: 'Free Delivery',
			desc: 'For all orders over $120',
		},
		{
			id: nanoid(),
			icon: ShieldCheckIcon,
			title: 'Safe Payment',
			desc: '100% secure payment',
		},
		{
			id: nanoid(),
			icon: CustomerServiceIcon,
			title: '24/7 Help Center',
			desc: 'Dedicated 24/7 support',
		},
		{
			id: nanoid(),
			icon: MoneyBillIcon,
			title: 'Money back guarantee',
			desc: '30 days money back guarantee',
		},
		{
			id: nanoid(),
			icon: GiftcardIcon,
			title: 'Giftcard',
			desc: 'Get giftcard on purchase',
		},
	],
	className: '',
};

/**
 * Prop Types.
 */
InfoSection.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.elementType,
			title: PropTypes.node,
			desc: PropTypes.node,
		})
	),
	className: PropTypes.string,
};

export default InfoSection;
