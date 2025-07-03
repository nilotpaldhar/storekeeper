"use client";

import { Toaster } from "sonner";
import { CheckCircle2, Info, CircleX, OctagonAlert, Loader2 } from "lucide-react";

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
