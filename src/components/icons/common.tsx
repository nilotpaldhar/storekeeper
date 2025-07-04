import * as React from "react";

const StarFilled = (props: React.SVGProps<SVGSVGElement>) => (
	<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>Star</title>
		<path
			stroke="none"
			d="M256 372.686 380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"
		/>
	</svg>
);

export { StarFilled };
