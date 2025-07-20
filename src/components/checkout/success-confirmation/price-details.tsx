import type { OrderSummary } from "@/types/domain.types";

import { CostPanelPriceRow } from "@/components/ui/cost-panel";

const PriceDetails = ({ summary }: { summary: OrderSummary }) => {
	const {
		formatted_subtotal_amount,
		payment_method_amount_cents,
		formatted_payment_method_amount,
		discount_amount_cents,
		formatted_discount_amount,
		shipping_amount_cents,
		formatted_shipping_amount,
	} = summary;

	const hasShippingAmount = shipping_amount_cents && shipping_amount_cents > 0;
	const hasPaymentMethodAmount = payment_method_amount_cents && payment_method_amount_cents > 0;
	const hasDiscountAmount = discount_amount_cents && Math.abs(discount_amount_cents) > 0;

	return (
		<div className="space-y-6">
			<h2 className="text-base font-bold">Price Details</h2>
			<dl className="flex flex-col space-y-4">
				<CostPanelPriceRow label="Subtotal" value={formatted_subtotal_amount ?? "---"} />

				{hasShippingAmount ? (
					<CostPanelPriceRow label="Shipping Cost" value={formatted_shipping_amount ?? "---"} />
				) : null}

				{hasPaymentMethodAmount ? (
					<CostPanelPriceRow
						label="Payment Processing Fee"
						value={formatted_payment_method_amount ?? "---"}
					/>
				) : null}

				{hasDiscountAmount ? (
					<CostPanelPriceRow label="Coupon Discount" value={formatted_discount_amount ?? "---"} />
				) : null}
			</dl>
		</div>
	);
};

export { PriceDetails };
