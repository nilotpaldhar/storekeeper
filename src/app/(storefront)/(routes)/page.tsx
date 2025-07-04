import Link from "next/link";
import { Container } from "@/components/ui/container";

const products = [
	{ slug: "nothing-phone-2-12gb-256gb-white", title: "Nothing Phone 2 (12GB/256GB, White)" },
	{
		slug: "samsung-galaxy-s24-ultra-256gb-phantom-black",
		title: "Samsung Galaxy S24 Ultra (256GB, Phantom Black)",
	},
	{ slug: "hp-pavilion-15-2024", title: "HP Pavilion 15 (2024)" },
	{
		slug: "apple-iphone-15-pro-128gb-titanium-blue",
		title: "Apple iPhone 15 Pro (128GB, Titanium Blue)",
	},
	{
		slug: "dell-xps-15-2024-intel-i7-16gb-512gb-ssd",
		title: "Dell XPS 15 (2024, Intel i7, 16GB/512GB SSD)",
	},
	{
		slug: "asus-rog-strix-g16-2024-i9-rtx-4070-32gb-1tb-ssd",
		title: "ASUS ROG Strix G16 (2024, i9, RTX 4070, 32GB/1TB SSD)",
	},
];

const HomePage = () => {
	return (
		<Container className="py-10 text-center">
			<h1 className="text-2xl">Home Page</h1>
			<ul className="mt-5 flex flex-col space-y-3">
				{products.map((p) => (
					<li key={p.slug}>
						<Link href={`/products/${p.slug}`}>{p.title}</Link>
					</li>
				))}
			</ul>
		</Container>
	);
};

export default HomePage;
