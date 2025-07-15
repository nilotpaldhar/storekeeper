"use client";

import { toast } from "sonner";

import { useRemoveCartItem } from "@/hooks/cart";

import { useDialogStore } from "@/stores/use-dialog-store";

import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ClearConversationDialog = () => {
	const { mutate, isPending } = useRemoveCartItem();

	const { type, isOpen, data, onClose } = useDialogStore();
	const isDialogOpen = isOpen && type === "CONFIRM_REMOVE_CART_ITEM";
	const { lineItemId, productTitle } = data ?? {};

	const handleRemove = () => {
		if (!lineItemId) return;

		mutate(
			{ lineItemId },
			{
				onError: () => {
					toast.error(
						`Could not remove ${productTitle ? `"${productTitle}"` : "this item"} from your cart. Please try again.`
					);
				},
				onSuccess: () => {
					toast.success(
						`${productTitle ? `Removed "${productTitle}" from your cart.` : `Item removed from your cart.`}`
					);
				},
				onSettled: () => onClose(),
			}
		);
	};

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<div className="flex flex-col space-y-6">
					<AlertDialogHeader>
						<AlertDialogTitle>Remove Item from Cart</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to remove {productTitle ? `'${productTitle}'` : "this item"}{" "}
							from your cart? You can add it again later.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
						<Button onClick={handleRemove} disabled={isPending}>
							{isPending ? "Removing..." : "Remove"}
						</Button>
					</AlertDialogFooter>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export { ClearConversationDialog };
