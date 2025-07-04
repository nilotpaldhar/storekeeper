const ProductPricing = () => {
	return (
		<div className="flex items-center space-x-4 text-lg leading-none">
			<span className="font-normal text-neutral-500 line-through">
				<del>$99.00</del>
			</span>
			<span className="font-extrabold">
				<ins className="no-underline">$79.00</ins>
			</span>
		</div>
	);
};

export { ProductPricing };
