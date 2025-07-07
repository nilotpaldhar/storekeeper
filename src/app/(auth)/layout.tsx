import { AuthIllustration } from "@/app/(auth)/_components/auth-illustration";
import { Header } from "@/app/(auth)/_components/header";

import { Container } from "@/components/ui/container";
import { ScrollArea } from "@/components/ui/scroll-area";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen overflow-hidden">
			<div className="relative size-full">
				<ScrollArea className="relative h-full">
					<Header className="absolute top-0" />
					<div className="h-full flex-1 pt-20 pb-10">
						<Container>{children}</Container>
					</div>
				</ScrollArea>
			</div>
			<div className="hidden h-full min-w-[625px] xl:block">
				<div className={`size-full bg-[#fafafa]`}>
					<div className="flex size-full items-center justify-center">
						<AuthIllustration />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
