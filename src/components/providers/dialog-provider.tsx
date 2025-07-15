"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ClearConversationDialog = dynamic(
	() =>
		import("../dialogs/confirm-remove-cart-item-dialog").then((mod) => mod.ClearConversationDialog),
	{ ssr: false }
);

const DialogProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<ClearConversationDialog />
		</>
	);
};

export { DialogProvider };
