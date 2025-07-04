import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const ProductShareDropdown = () => {
	return (
		<Button variant="light-ghost" className="h-max p-0">
			<Share2 size={16} />
			<span className="font-bold">Share</span>
		</Button>
	);
};

export { ProductShareDropdown };
