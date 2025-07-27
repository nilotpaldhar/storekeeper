"use client";

import type { NavbarProps } from "sanity";

import { Stack } from "@sanity/ui";
import { useState } from "react";

import { SyncProductsBanner } from "@/components/sanity/sync-products-banner";
import { SyncProductsDialog } from "@/components/sanity/sync-products-dialog";
import { SyncSkusDialog } from "@/components/sanity/sync-skus-dialog";

const CustomNavbar = (props: NavbarProps) => {
	const { renderDefault } = props;

	const [syncSkusDialogOpen, setSyncSkusDialogOpen] = useState(false);
	const [syncProductsDialogOpen, setSyncProductsDialogOpen] = useState(false);

	return (
		<Stack>
			<SyncProductsBanner
				onSyncSkus={() => setSyncSkusDialogOpen(true)}
				onSyncAlgolia={() => setSyncProductsDialogOpen(true)}
			/>
			<SyncSkusDialog open={syncSkusDialogOpen} onClose={() => setSyncSkusDialogOpen(false)} />
			<SyncProductsDialog
				open={syncProductsDialogOpen}
				onClose={() => setSyncProductsDialogOpen(false)}
			/>
			{renderDefault(props)}
		</Stack>
	);
};

export { CustomNavbar };
