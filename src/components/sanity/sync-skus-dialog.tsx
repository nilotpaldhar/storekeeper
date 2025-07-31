"use client";

import { Box, Button, Dialog, Flex, Layer, Stack, Text, TextInput, useToast } from "@sanity/ui";
import { useEffect, useState } from "react";

import { useSyncSkusFromCommerceLayer } from "@/hooks/sync-api";

type SyncSkusDialogProps = {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

const SyncSkusDialog = ({ open, onClose, onSuccess }: SyncSkusDialogProps) => {
	const toast = useToast();
	const [secret, setSecret] = useState("");

	const { mutate, isPending, reset } = useSyncSkusFromCommerceLayer();

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
				id="sync-skus-dialog"
				header="Admin Sync: Import SKUs from Commerce Layer"
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
							This is a restricted admin operation. To fetch SKUs from Commerce Layer and sync them
							into Sanity, please enter the secure admin token.
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

export { SyncSkusDialog };
