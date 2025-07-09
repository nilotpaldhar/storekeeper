"use client";

import { CheckCircle2, CircleX, Info, Loader2, OctagonAlert } from "lucide-react";
import { Toaster } from "sonner";

const ToastProvider = () => {
	return (
		<Toaster
			richColors
			position="bottom-right"
			theme="light"
			icons={{
				success: <CheckCircle2 size={18} />,
				info: <Info size={18} />,
				error: <CircleX size={18} />,
				warning: <OctagonAlert size={18} />,
				loading: <Loader2 size={18} className="animate-spin" />,
			}}
		/>
	);
};

export { ToastProvider };
