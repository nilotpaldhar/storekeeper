import { CartItem } from "@/components/cart/item-list/item";
import { Divider } from "@/components/ui/divider";
// import { ThreeDotsLoader } from "@/components/ui/loader";

const CartItemList = () => {
	const items = Array.from({ length: 10 }, (_, i) => i + 1);

	return (
		<div className="xs:py-5 border border-dashed border-neutral-200 py-3">
			{/* <div className="flex min-h-[60vh] items-center justify-center">
				<ThreeDotsLoader />
			</div> */}
			<ul>
				{items.map((item, idx) => (
					<li key={item}>
						<CartItem />
						{idx < items.length - 1 ? (
							<Divider className="mb-6 before:border-neutral-200 sm:my-6" type="dashed" />
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
};

export { CartItemList };
