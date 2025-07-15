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
		formatted_total_tax_amount,
		formatted_discount_amount,
		formatted_total_amount_with_taxes,
		coupon_code,
	} = summary;

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
						<CostPanelPriceRow label="Total tax" value={formatted_total_tax_amount ?? "---"} />
						<CostPanelPriceRow label="Coupon Discount" value={formatted_discount_amount ?? "---"} />
					</dl>
				</CostPanelBlock>
			</CostPanelContent>
			<CostPanelBlock hideDivider>
				<CostPanelPriceRow
					className="font-semibold"
					label="Total Price"
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
