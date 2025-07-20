"use client";

import type { OrderLineItem, OrderSummary } from "@/types/domain.types";

import { OrderItemList } from "@/components/checkout/summary/item-list";
import {
	CostPanel,
	CostPanelBlock,
	CostPanelContent,
	CostPanelHeader,
	CostPanelPriceRow,
	CostPanelTitle,
} from "@/components/ui/cost-panel";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils/general/cn";

type CheckoutSummaryProps = {
	summary: OrderSummary;
	items: OrderLineItem[];
};

const CheckoutSummary = ({ summary, items }: CheckoutSummaryProps) => {
	const {
		formatted_subtotal_amount,
		payment_method_amount_cents,
		formatted_payment_method_amount,
		discount_amount_cents,
		formatted_discount_amount,
		shipping_amount_cents,
		formatted_shipping_amount,
		total_tax_amount_cents,
		formatted_total_tax_amount,
		formatted_total_amount_with_taxes,
	} = summary;

	const hasShippingAmount = shipping_amount_cents && shipping_amount_cents > 0;
	const hasPaymentMethodAmount = payment_method_amount_cents && payment_method_amount_cents > 0;
	const hasDiscountAmount = discount_amount_cents && Math.abs(discount_amount_cents) > 0;
	const hasTotalTaxAmount = total_tax_amount_cents && total_tax_amount_cents > 0;

	const resolveTotalItemsStr = () => {
		const skusCount = summary.skus_count;
		if (!skusCount) return `0 Item`;
		if (skusCount <= 1) return `${skusCount} Item`;
		return `${skusCount} Items`;
	};

	return (
		<CostPanel asChild>
			<div>
				<CostPanelHeader>
					<CostPanelTitle>Order Summary ({resolveTotalItemsStr()})</CostPanelTitle>
				</CostPanelHeader>
				<CostPanelContent>
					<CostPanelBlock>
						<ScrollArea className={cn(items.length > 3 && "h-[300px]")}>
							<OrderItemList items={items} />
						</ScrollArea>
					</CostPanelBlock>
					<CostPanelBlock>
						<dl className="flex flex-col space-y-4">
							<CostPanelPriceRow label="Subtotal" value={formatted_subtotal_amount ?? "---"} />

							{hasShippingAmount ? (
								<CostPanelPriceRow
									label="Shipping Cost"
									value={formatted_shipping_amount ?? "---"}
								/>
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
			</div>
		</CostPanel>
	);
};
export { CheckoutSummary };
