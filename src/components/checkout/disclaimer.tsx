import { CircleAlert } from "lucide-react";

const CheckoutDisclaimer = () => {
	return (
		<div className="bg-warning-50 text-warning-700 flex flex-col space-y-3 p-3 text-xs lg:p-5">
			<div className="flex items-center space-x-2">
				<CircleAlert size={16} />
				<h4 className="text-sm leading-none font-bold">Disclaimer</h4>
			</div>
			<p className="leading-relaxed">
				This e-commerce site is for demonstration purposes only. Do not enter any real personal or
				payment information. For testing, please use the following dummy card details:
			</p>
			<ul className="flex flex-col space-y-1.5">
				<li className="flex items-baseline space-x-1 font-semibold">
					<span>Name:</span>
					<span>Any name</span>
				</li>
				<li className="flex items-baseline space-x-1 font-semibold">
					<span>Card Number:</span>
					<span>4242 4242 4242 4242</span>
				</li>
				<li className="flex items-baseline space-x-1 font-semibold">
					<span>Expiry Date:</span>
					<span>Any future date</span>
				</li>
				<li className="flex items-baseline space-x-1 font-semibold">
					<span>CVV:</span>
					<span>Any 3 or 4 digit number</span>
				</li>
			</ul>
		</div>
	);
};

export { CheckoutDisclaimer };
