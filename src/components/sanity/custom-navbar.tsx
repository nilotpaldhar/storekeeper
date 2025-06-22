"use client";

import type { NavbarProps } from "sanity";

import { useState } from "react";
import { Stack } from "@sanity/ui";

import { SyncSkusBanner } from "@/components/sanity/sync-skus-banner";
import { SyncSkusDialog } from "@/components/sanity/sync-skus-dialog";

const CustomNavbar = (props: NavbarProps) => {
	const { renderDefault } = props;
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Stack>
			<SyncSkusBanner onClick={() => setDialogOpen(true)} />
			<SyncSkusDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
			{renderDefault(props)}
		</Stack>
	);
};

export { CustomNavbar };
