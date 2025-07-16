import { Container } from "@/components/ui/container";
import { ThreeDotsLoader } from "@/components/ui/loader";

const CheckoutLoading = () => {
	return (
		<main className="flex min-h-[80vh] items-center justify-center py-5">
			<Container className="flex justify-center">
				<ThreeDotsLoader />
			</Container>
		</main>
	);
};

export default CheckoutLoading;
