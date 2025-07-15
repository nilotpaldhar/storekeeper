"use client";

import type { CartSummary } from "@/types/domain.types";

import { ArrowRight, TagsIcon, XIcon } from "lucide-react";

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
import { Input } from "@/components/ui/input";

type CartSummaryProps = {
	summary: CartSummary;
};

const CartSummary = ({ summary }: CartSummaryProps) => {
	const {
		skus_count,
		formatted_subtotal_amount,
		formatted_total_tax_amount,
		formatted_discount_amount,
		formatted_total_amount_with_taxes,
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
				<CostPanelBlock className="flex flex-col space-y-4">
					<div className="flex items-center space-x-1">
						<TagsIcon size={16} />
						<span className="text-sm font-semibold">Promotions</span>
					</div>
					<div className="flex items-center space-x-2">
						<button
							type="button"
							className="flex cursor-pointer items-center rounded-full text-neutral-900 hover:text-current hover:opacity-80"
						>
							<XIcon size={16} />
							<span className="sr-only">Remove Coupon</span>
						</button>
						<div className="flex items-center space-x-1 text-xs">
							<span className="font-normal">ST11MT60622</span>
							<span className="text-neutral-500">is applied</span>
						</div>
					</div>
					<div>
						<form>
							<div className="flex max-w-xs items-start space-x-1">
								<Input required id="couponCode" placeholder="Enter your code" className="h-8" />
								<Button type="submit" className="h-8">
									Apply
								</Button>
							</div>
						</form>
					</div>
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
				<Button className="w-full">
					<span>Proceed To Checkout</span>
					<ArrowRight />
				</Button>
			</CostPanelFooter>
		</CostPanel>
	);
};
export { CartSummary };
