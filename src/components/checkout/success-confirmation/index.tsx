"use client";

import { useConfirmedOrder } from "@/hooks/orders";

import { ILLUSTRATIONS } from "@/constants/media";

import { CheckoutError } from "@/components/checkout/error";
import { OrderAddressDetails } from "@/components/checkout/success-confirmation/order-address-details";
import { OrderDetailsHeader } from "@/components/checkout/success-confirmation/order-details-header";
import { PriceDetails } from "@/components/checkout/success-confirmation/price-details";
import { ProductsList } from "@/components/checkout/success-confirmation/products-list";
import { Container } from "@/components/ui/container";
import {
	CostPanel,
	CostPanelBlock,
	CostPanelContent,
	CostPanelFooter,
	CostPanelHeader,
	CostPanelPriceRow,
} from "@/components/ui/cost-panel";
import { Empty, EmptyImage, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { ThreeDotsLoader } from "@/components/ui/loader";

const CheckoutSuccessConfirmation = ({ orderId }: { orderId: string }) => {
	const { data, isLoading, isError, error } = useConfirmedOrder({ id: orderId });

	const summary = data?.data?.summary;
	const orderStatus = summary?.status ?? "";
	const hasTotalTaxAmount = summary?.total_tax_amount_cents && summary?.total_tax_amount_cents > 0;

	const items = data?.data?.items;
	const paymentMethod = data?.data?.paymentMethod;
	const address = data?.data?.address;

	if (isLoading) {
		return (
			<main className="flex min-h-[80vh] items-center justify-center py-5">
				<Container className="flex justify-center">
					<ThreeDotsLoader />
				</Container>
			</main>
		);
	}

	if (!isLoading && isError) {
		return (
			<CheckoutError
				title={error.message}
				message={
					<>
						<p>The order you&apos;re looking for may not exist or the link might be invalid.</p>
						<p>
							If you believe this is a mistake, please check your confirmation email or contact
							support.
						</p>
					</>
				}
				hideRetryBtn
			/>
		);
	}

	if (!isLoading && !isError && orderStatus !== "placed") {
		return (
			<CheckoutError
				title="Order Status Unavailable!"
				message={
					<>
						<p>We found your order, but its status is unclear or not yet finalized.</p>
						<p>
							Please allow a few minutes and refresh the page, or check your order history for
							updates.
						</p>
					</>
				}
			/>
		);
	}

	return (
		<main className="py-10 lg:py-14">
			<Container>
				<div className="mx-auto max-w-3xl">
					<div className="flex justify-center">
						<Empty>
							<EmptyImage src={ILLUSTRATIONS.ORDERS.SUCCESS} alt="" width={200} height={200} />
							<EmptyTitle>Thank you for your purchase!</EmptyTitle>
							<EmptyDescription>
								Your order will be processed within 24 hours during working days. We will notify you
								by email once your order has been shipped.
							</EmptyDescription>
						</Empty>
					</div>

					<div className="mx-auto mt-16 max-w-xl space-y-14">
						<CostPanel asChild>
							<div>
								<CostPanelHeader>
									{summary && paymentMethod ? (
										<OrderDetailsHeader summary={summary} paymentMethod={paymentMethod} />
									) : null}
								</CostPanelHeader>
								<CostPanelContent>
									<CostPanelBlock hideDivider>
										<div className="space-y-6">
											<div className="space-y-6">
												<h2 className="text-base font-bold">Products</h2>
												{items ? <ProductsList items={items} /> : null}
											</div>
											{summary ? <PriceDetails summary={summary} /> : null}
										</div>
									</CostPanelBlock>
								</CostPanelContent>
								<CostPanelFooter>
									<CostPanelPriceRow
										label={
											<div className="flex items-center space-x-1">
												<span className="font-semibold">Total Price</span>
												{hasTotalTaxAmount ? (
													<span className="text-xs font-light">
														(includes {summary?.formatted_total_tax_amount ?? "---"} tax)
													</span>
												) : null}
											</div>
										}
										value={summary?.formatted_total_amount_with_taxes ?? "---"}
									/>
								</CostPanelFooter>
							</div>
						</CostPanel>
						{address?.shipping ? (
							<OrderAddressDetails title="Shipping Address" address={address?.shipping} />
						) : null}
						{address?.billing ? (
							<OrderAddressDetails title="Billing Address" address={address?.billing} />
						) : null}
					</div>
				</div>
			</Container>
		</main>
	);
};

export { CheckoutSuccessConfirmation };
