import PropTypes from 'prop-types';

import Modal from '@ui/feedback/Modal';
import Image from '@ui/data-display/Image';
import Quantity from '@ui/data-entry/Quantity';
import ScrollArea from '@ui/general/ScrollArea';
import RegularButton from '@ui/buttons/RegularButton';
import WishlistCardVariant from '@ui/commerce/WishlistCard/Variant';

import CartIcon from '@icons/regular/Cart';

/**
 * Render the WishlistCardAction component.
 *
 * @return {Element} The WishlistCardRemove component.
 */
const WishlistCardAction = ({ thumbnail, title, price, variants }) => {
	const hasVariants = variants?.length > 0;

	const trigger = (
		<RegularButton fullWidth startIcon={CartIcon} intent="primary-ghost">
			<span className="truncate">Move To Cart</span>
		</RegularButton>
	);

	return (
		<Modal trigger={trigger}>
			<div className="flex flex-col space-y-6">
				<div className="flex items-start space-x-4 pb-4 border-b border-neutral-100">
					<div className="shrink-0 w-20 bg-neutral-50">
						<Image src={thumbnail} alt={title} width={80} height={80} />
					</div>
					<div className="text-sm pt-1">
						<h3 className="font-medium leading-snug">{title}</h3>
						<p className="font-bold mt-2">
							<data value={price?.raw}>{price?.formattedWithSymbol}</data>
						</p>
					</div>
				</div>
				{hasVariants && (
					<ScrollArea height={variants?.length > 2 ? 140 : null}>
						<div className="flex flex-col space-y-4">
							{variants?.map((variant) => (
								<WishlistCardVariant
									id={variant?.id}
									key={variant?.id}
									// disabled={}
									label={variant?.name}
									options={variant?.options}
									// onValueChange={(val) => { }}
								/>
							))}
						</div>
					</ScrollArea>
				)}
				<div className="flex items-center space-x-3">
					<Quantity min={1} max={50} defaultValue={1} disabled={false} onChange={() => {}} />
					<RegularButton fullWidth>Done</RegularButton>
				</div>
			</div>
		</Modal>
	);
};

/**
 * Default Props.
 */
WishlistCardAction.defaultProps = {
	variants: [],
};

/**
 * Prop Types.
 */
WishlistCardAction.propTypes = {
	thumbnail: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.shape({
		raw: PropTypes.number,
		formattedWithSymbol: PropTypes.string,
	}).isRequired,
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			options: PropTypes.arrayOf(PropTypes.shape({})),
		})
	),
};

export default WishlistCardAction;
