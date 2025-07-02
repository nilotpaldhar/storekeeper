"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { ILLUSTRATIONS } from "@/constants/media";

const AuthIllustration = () => {
	const path = usePathname();

	const resolveIllustrationSrc = () => {
		if (path === "/login/verification") return ILLUSTRATIONS.AUTH.VERIFICATION;
		if (path === "/login/error") return ILLUSTRATIONS.AUTH.ERROR;
		return ILLUSTRATIONS.AUTH.DEFAULT;
	};

	return <Image src={resolveIllustrationSrc()} alt="Graphics" width={625} height={625} priority />;
};
export { AuthIllustration };
