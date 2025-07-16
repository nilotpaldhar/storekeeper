import Link from "next/link";

const OrderItem = () => {
	return (
		<div className="flex flex-col space-y-1.5">
			<h3>
				<Link
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-medium text-neutral-900"
				>
					boAt Airdopes 131 Bluetooth Headset (Active Black, True Wireless)
				</Link>
			</h3>
			<div className="flex flex-col space-y-1.5 text-sm">
				<span className="flex items-center space-x-2">
					<small className="text-neutral-500">Product Code:</small>
					<small className="font-light">NTHNGP2-12-256-WH</small>
				</span>
				<div className="flex items-center space-x-5">
					<span className="flex items-center space-x-2">
						<small className="text-neutral-500">Qty:</small>
						<small className="font-light">2</small>
					</span>
					<span className="flex items-center space-x-2">
						<small className="text-neutral-500">Price:</small>
						<small className="font-light">$150.00</small>
					</span>
				</div>
			</div>
		</div>
	);
};

const OrderItemList = () => {
	return (
		<ul className="flex flex-col space-y-6">
			<li>
				<OrderItem />
			</li>
			<li>
				<OrderItem />
			</li>
			<li>
				<OrderItem />
			</li>
			<li>
				<OrderItem />
			</li>
		</ul>
	);
};

export { OrderItemList };
