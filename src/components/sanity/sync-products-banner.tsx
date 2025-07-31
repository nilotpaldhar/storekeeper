"use client";

import { Box, Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { Download, Send } from "lucide-react";

type SyncProductsBannerProps = {
	onSyncSkus: () => void;
	onSyncAlgolia: () => void;
	syncingSkus?: boolean;
	syncingAlgolia?: boolean;
};

const SyncProductsBanner = ({
	onSyncSkus,
	onSyncAlgolia,
	syncingSkus = false,
	syncingAlgolia = false,
}: SyncProductsBannerProps) => {
	return (
		<Card tone="neutral" padding={3} radius={0} shadow={1}>
			<Flex justify="space-between" align="center" wrap={["wrap", "nowrap"]} gap={4}>
				{/* Left: Title and Subtitle */}
				<Box flex={1}>
					<Stack space={3}>
						<Text size={2} weight="medium">
							Sync Product Data
						</Text>
						<Text size={1} muted>
							Sync SKUs from Commerce Layer and index published products to Algolia.
						</Text>
					</Stack>
				</Box>

				{/* Right: Two Buttons Side-by-Side */}
				<Flex gap={2} flex={1} justify="flex-end" wrap="wrap">
					{/* Sync SKUs */}
					<Button
						tone="critical"
						mode="default"
						icon={Download}
						loading={syncingSkus}
						disabled={syncingSkus}
						text={syncingSkus ? "Fetching SKUs…" : "Fetch SKUs"}
						onClick={onSyncSkus}
					/>

					{/* Sync Products to Algolia */}
					<Button
						tone="positive"
						mode="default"
						icon={Send}
						loading={syncingAlgolia}
						disabled={syncingAlgolia}
						text={syncingAlgolia ? "Pushing products to Algolia…" : "Push products to Algolia"}
						onClick={onSyncAlgolia}
					/>
				</Flex>
			</Flex>
		</Card>
	);
};

export { SyncProductsBanner };
