"use client";

import { Card, Flex, Text, Button, Box, Stack } from "@sanity/ui";
import { RefreshCw } from "lucide-react";

type SyncSkusBannerProps = {
	onClick: () => void;
	loading?: boolean;
};

const SyncSkusBanner = ({ onClick, loading }: SyncSkusBannerProps) => {
	return (
		<Card tone="primary" padding={3} radius={0} shadow={1}>
			<Flex justify="space-between" align="center">
				<Box>
					<Stack space={3}>
						<Text size={2} weight="medium">
							Sync SKUs from Commerce Layer
						</Text>
						<Text size={1} muted>
							Click the button to fetch and sync SKUs into Sanity from Commerce Layer.
						</Text>
					</Stack>
				</Box>
				<Button
					tone="primary"
					mode="ghost"
					icon={RefreshCw}
					loading={loading}
					text={loading ? "Syncing…" : "Sync Now"}
					disabled={loading}
					onClick={onClick}
				/>
			</Flex>
		</Card>
	);
};

export { SyncSkusBanner };
