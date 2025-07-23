import {
	type LucideIcon,
	CircleDollarSign,
	CreditCard,
	Gift,
	Headset,
	Lock,
	PackageCheck,
	ShieldCheck,
	Truck,
} from "lucide-react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const FEATURES = [
	{
		id: "free-delivery",
		title: "Free Delivery",
		description: "Orders over ₹499",
		icon: Truck,
	},
	{
		id: "secure-payment",
		title: "Safe Payment",
		description: "100% secure checkout",
		icon: ShieldCheck,
	},
	{
		id: "help-center",
		title: "24/7 Help Center",
		description: "Always here to help",
		icon: Headset,
	},
	{
		id: "money-back",
		title: "Money-Back Guarantee",
		description: "15-day refund policy",
		icon: CircleDollarSign,
	},
	{
		id: "easy-returns",
		title: "Easy Returns",
		description: "No-hassle process",
		icon: PackageCheck,
	},
	{
		id: "exclusive-offers",
		title: "Exclusive Offers",
		description: "Members-only deals",
		icon: Gift,
	},
	{
		id: "data-protection",
		title: "Data Protection",
		description: "Your info is safe",
		icon: Lock,
	},
	{
		id: "multiple-payment",
		title: "Flexible Payments",
		description: "Cards, UPI & more",
		icon: CreditCard,
	},
];

type FeatureHighlightItemProps = {
	title: string;
	description: string;
	icon: LucideIcon;
	className?: string;
};

const FeatureHighlightItem = ({
	title,
	description,
	icon: Icon,
	className,
}: FeatureHighlightItemProps) => {
	return (
		<div className={className}>
			<div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
				<div className="text-primary-600 flex items-center">
					<Icon size={36} />
				</div>
				<div className="flex flex-col space-y-2 text-center text-sm leading-none lg:text-left">
					<h3 className="truncate overflow-hidden font-bold">{title}</h3>
					<p className="truncate overflow-hidden font-normal">{description}</p>
				</div>
			</div>
		</div>
	);
};

const FeatureHighlights = () => {
	return (
		<Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full px-4">
			<CarouselContent>
				{FEATURES.map((feature) => (
					<CarouselItem
						key={feature.title}
						className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
					>
						<FeatureHighlightItem
							title={feature.title}
							description={feature.description}
							icon={feature.icon}
							className="h-full"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export { FeatureHighlights };
