"use client";

import { useState, useEffect } from "react";
import { Button, TextInput, Dialog, Layer, Box, Flex, Stack, Text, useToast } from "@sanity/ui";

import { useAction } from "next-safe-action/hooks";
import { syncSkusAction } from "@/actions/sanity/sync-skus";

type SyncSkusDialogProps = {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

const SyncSkusDialog = ({ open, onClose, onSuccess }: SyncSkusDialogProps) => {
	const toast = useToast();
	const [secret, setSecret] = useState("");

	const { execute, isPending, reset } = useAction(syncSkusAction, {
		onSuccess({ data }) {
			toast.push({
				status: "success",
				title: "Sync Completed",
				description: data?.message,
			});
			onSuccess?.();
		},
		onError({ error }) {
			toast.push({
				status: "error",
				title: "Sync Failed",
				description: error.serverError ?? "Unexpected error occurred",
			});
		},
		onSettled() {
			onClose();
		},
	});

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
				header="Admin Sync: Commerce Layer SKUs"
				onClose={onClose}
				width={1}
				footer={
					<Flex justify="flex-end" padding={3}>
						<Button mode="bleed" text="Cancel" onClick={onClose} disabled={isPending} />
						<Button
							tone="primary"
							text="Run Sync"
							onClick={() => execute({ secret })}
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
							This is an admin-only operation. Enter the secret token to trigger the SKU sync from
							Commerce Layer to Sanity.
						</Text>

						<TextInput
							type="password"
							value={secret}
							onChange={(e) => setSecret(e.currentTarget.value)}
							placeholder="Enter admin sync secret"
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
