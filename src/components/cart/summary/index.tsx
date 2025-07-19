"use client";

import type { CartSummary } from "@/types/domain.types";

import { ArrowRight } from "lucide-react";

import { PromotionBlock } from "@/components/cart/summary/promotion-block";
import { Button } from "@/components/ui/button";
import {
	CostPanel,
	CostPanelBlock,
	CostPanelContent,
	CostPanelFooter,
	CostPanelHeader,
	CostPanelPriceRow,
	CostPanelTitle,
} from "@/components/ui/cost-panel";

type CartSummaryProps = {
	summary: CartSummary;
	onProceedToCheckout: () => void;
};

const CartSummary = ({ summary, onProceedToCheckout }: CartSummaryProps) => {
	const {
		skus_count,
		formatted_subtotal_amount,
		shipping_amount_cents,
		formatted_shipping_amount,
		payment_method_amount_cents,
		formatted_payment_method_amount,
		discount_amount_cents,
		formatted_discount_amount,
		total_tax_amount_cents,
		formatted_total_tax_amount,
		formatted_total_amount_with_taxes,
		coupon_code,
	} = summary;

	const hasShippingAmount = shipping_amount_cents && shipping_amount_cents > 0;
	const hasPaymentMethodAmount = payment_method_amount_cents && payment_method_amount_cents > 0;
	const hasDiscountAmount = discount_amount_cents && Math.abs(discount_amount_cents) > 0;
	const hasTotalTaxAmount = total_tax_amount_cents && total_tax_amount_cents > 0;

	const resolveTotalItemsStr = () => {
		if (!skus_count) return `0 Item`;
		if (skus_count <= 1) return `${skus_count} Item`;
		return `${skus_count} Items`;
	};

	return (
		<CostPanel>
			<CostPanelHeader>
				<CostPanelTitle>Cart Summary ({resolveTotalItemsStr()})</CostPanelTitle>
			</CostPanelHeader>
			<CostPanelContent>
				<CostPanelBlock>
					<PromotionBlock couponCode={coupon_code} />
				</CostPanelBlock>
				<CostPanelBlock>
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
							<CostPanelPriceRow
								label="Coupon Discount"
								value={formatted_discount_amount ?? "---"}
							/>
						) : null}
					</dl>
				</CostPanelBlock>
			</CostPanelContent>
			<CostPanelBlock hideDivider>
				<CostPanelPriceRow
					className="font-semibold"
					label={
						<div className="flex items-center space-x-1">
							<span className="font-semibold">Total Price</span>
							{hasTotalTaxAmount ? (
								<span className="text-xs font-light">
									(includes {formatted_total_tax_amount ?? "---"} tax)
								</span>
							) : null}
						</div>
					}
					value={formatted_total_amount_with_taxes ?? "---"}
				/>
			</CostPanelBlock>
			<CostPanelFooter>
				<Button className="w-full" onClick={onProceedToCheckout}>
					<span>Proceed To Checkout</span>
					<ArrowRight />
				</Button>
			</CostPanelFooter>
		</CostPanel>
	);
};
export { CartSummary };
