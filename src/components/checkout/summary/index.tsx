"use client";

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

const CheckoutSummary = () => {
	return (
		<CostPanel asChild>
			<div>
				<CostPanelHeader>
					<CostPanelTitle>Order Summary (10 Items)</CostPanelTitle>
				</CostPanelHeader>
				<CostPanelContent>
					<CostPanelBlock>
						<ScrollArea className="h-[300px]">
							<OrderItemList />
						</ScrollArea>
					</CostPanelBlock>

					<CostPanelBlock>
						<dl className="flex flex-col space-y-4">
							<CostPanelPriceRow label="Subtotal" value="$1050.00" />
							<CostPanelPriceRow label="Shipping Cost" value="$20.00" />
							<CostPanelPriceRow label="Coupon Discount" value="-$50.00" />
						</dl>
					</CostPanelBlock>
				</CostPanelContent>
				<CostPanelBlock hideDivider>
					<CostPanelPriceRow
						label={
							<div className="flex items-center space-x-1">
								<span className="font-semibold">Total Price</span>
								<span className="text-xs font-light">(includes $0.00 tax)</span>
							</div>
						}
						value="$1020.00"
					/>
				</CostPanelBlock>
			</div>
		</CostPanel>
	);
};
export { CheckoutSummary };
