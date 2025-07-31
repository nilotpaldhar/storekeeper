"use client";

import { Box, Button, Dialog, Flex, Layer, Stack, Text, TextInput, useToast } from "@sanity/ui";
import { useEffect, useState } from "react";

import { useIndexProductsToAlgolia } from "@/hooks/sync-api";

type SyncProductsDialogProps = {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

const SyncProductsDialog = ({ open, onClose, onSuccess }: SyncProductsDialogProps) => {
	const toast = useToast();
	const [secret, setSecret] = useState("");

	const { mutate, isPending, reset } = useIndexProductsToAlgolia();

	const handleSync = () => {
		mutate(
			{ secret },
			{
				onSuccess(data) {
					toast.push({
						status: "success",
						title: "Sync Completed",
						description: data?.message,
					});
					onSuccess?.();
					onClose();
				},
				onError(error) {
					toast.push({
						status: "error",
						title: "Sync Failed",
						description: error.message ?? "Unexpected error occurred",
					});
				},
				onSettled() {
					setSecret("");
				},
			}
		);
	};

	// Reset form on open/close
	useEffect(() => {
		if (!open) {
			setSecret("");
			reset();
		}
	}, [open, reset]);

	if (!open) return null;

	return (
		<Layer>
			<Dialog
				id="sync-products-dialog"
				header="Admin Sync: Push Products to Algolia"
				onClose={onClose}
				width={1}
				footer={
					<Flex justify="flex-end" padding={3}>
						<Button mode="bleed" text="Cancel" onClick={onClose} disabled={isPending} />
						<Button
							tone="primary"
							text="Run Sync"
							onClick={handleSync}
							disabled={!secret || isPending}
							loading={isPending}
							style={{ marginLeft: "0.5rem" }}
						/>
					</Flex>
				}
			>
				<Box padding={4}>
					<Stack space={4}>
						<Text size={1}>
							This operation pushes published products from Sanity to Algolia. Admin access is
							required. Enter the sync token below to proceed.
						</Text>

						<TextInput
							type="password"
							value={secret}
							onChange={(e) => setSecret(e.currentTarget.value)}
							placeholder="Enter admin sync token"
							autoFocus
							disabled={isPending}
						/>
					</Stack>
				</Box>
			</Dialog>
		</Layer>
	);
};

export { SyncProductsDialog };
