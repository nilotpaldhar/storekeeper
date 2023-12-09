import PropTypes from 'prop-types';

import Box from '@ui/data-display/Box';
import Modal from '@ui/feedback/Modal';
import PriceRecap from '@ui/commerce/PriceRecap';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the TotalPrice component.
 *
 * @return {Element} The TotalPrice component.
 */
const TotalPrice = ({ products, subTotal, grandTotal, discount, shipping }) => (
	<Box className="!border-solid">
		<Box.Block>
			<div className="flex items-center justify-between gap-2">
				<div className="text-sm font-semibold text-neutral-900">Total Price</div>
				<div className="flex flex-col items-end space-y-1">
					<div className="text-sm font-semibold text-neutral-900">{grandTotal}</div>
					<Modal
						trigger={
							<button type="button" className="font-semibold">
								View Breakup
							</button>
						}
					>
						<h3 className="text-base font-semibold text-neutral-900">Payment Information</h3>
						<Box.Block>
							<ul className="flex flex-col space-y-4">
								{products?.map((product) => (
									<li key={product?.id} className="flex items-center justify-between">
										<div className="flex items-center gap-2 mr-12 overflow-hidden">
											<span className="truncate">{product?.displayName ?? product?.name}</span>
											<CloseIcon className="!text-xs !text-neutral-500" />
											<span>{product?.quantity}</span>
										</div>
										<mark className="shrink-0 text-sm font-normal bg-transparent">
											{product?.total?.formattedWithSymbol}
										</mark>
									</li>
								))}
							</ul>
						</Box.Block>
						<Box.Divider />
						<PriceRecap
							subTotal={subTotal}
							grandTotal={grandTotal}
							discount={discount}
							shipping={shipping}
							hideTaxIfEmpty={false}
							tax={null}
						/>
					</Modal>
				</div>
			</div>
		</Box.Block>
	</Box>
);

/**
 * Default Props.
 */
TotalPrice.defaultProps = {
	products: [],
	subTotal: null,
	grandTotal: null,
	discount: null,
	shipping: null,
};

/**
 * Prop Types.
 */
TotalPrice.propTypes = {
	products: PropTypes.arrayOf(PropTypes.shape({})),
	subTotal: PropTypes.string,
	grandTotal: PropTypes.string,
	discount: PropTypes.string,
	shipping: PropTypes.string,
};

export default TotalPrice;
