import { Footer } from "@/app/(storefront)/_components/footer";
import { Header } from "@/app/(storefront)/_components/header";

const StorefrontLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="flex-1">{children}</div>
			<Footer />
		</div>
	);
};

export default StorefrontLayout;
