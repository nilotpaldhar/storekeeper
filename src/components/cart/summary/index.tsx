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

const CartSummary = () => {
	return (
		<CostPanel>
			<CostPanelHeader>
				<CostPanelTitle>Cart Summary (2 Items)</CostPanelTitle>
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
						<CostPanelPriceRow label="Subtotal" value="$1050.00" />
						<CostPanelPriceRow
							label="Coupon Discount"
							value={<span className="text-success-600">-$50.00</span>}
						/>
					</dl>
				</CostPanelBlock>
			</CostPanelContent>
			<CostPanelBlock hideDivider>
				<CostPanelPriceRow className="font-semibold" label="Total Price" value="$1020.00" />
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
