import type { OrderSummary } from "@/types/domain.types";
import type { PaymentMethod } from "@commercelayer/sdk";

const formatDate = (dateStr?: string) => {
	if (!dateStr) return "---";
	return new Date(dateStr).toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const OrderDetailsHeader = ({
	summary,
	paymentMethod,
}: {
	summary: OrderSummary;
	paymentMethod: PaymentMethod;
}) => {
	return (
		<div className="flex flex-col space-y-6 md:flex-row md:justify-between md:space-y-0">
			<div className="flex flex-row items-center justify-between gap-1.5 md:flex-col md:justify-center">
				<span className="font-bold">Date</span>
				<span className="text-sm">{formatDate(summary?.created_at)}</span>
			</div>
			<div role="separator" className="hidden h-14 w-px bg-neutral-50 md:block" />
			<div className="flex flex-row items-center justify-between gap-1.5 md:flex-col md:justify-center">
				<span className="font-bold">Order ID</span>
				<span className="text-sm">{summary?.id ?? "---"}</span>
			</div>
			<div role="separator" className="hidden h-14 w-px bg-neutral-50 md:block" />
			<div className="flex flex-row items-center justify-between gap-1.5 md:flex-col md:justify-center">
				<span className="font-bold">Payment Method</span>
				<span className="text-sm">{paymentMethod?.name ?? "---"}</span>
			</div>
		</div>
	);
};
export { OrderDetailsHeader };
