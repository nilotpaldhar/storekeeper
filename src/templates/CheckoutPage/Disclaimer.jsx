import ExclamationIcon from '@icons/regular/Exclamation';

/**
 * Render the Disclaimer component.
 *
 * @return {Element} The Disclaimer component.
 */
const Disclaimer = () => (
	<div className="flex flex-col space-y-3 text-xs p-3 lg:p-5 bg-warning-50 text-warning-700">
		<div className="flex items-center space-x-2">
			<span
				aria-label="exclamation-circle"
				className="flex justify-center items-center w-[18px] h-[18px] rounded-full shrink-0 bg-warning-600 text-white"
			>
				<ExclamationIcon role="img" className="!text-xs" />
			</span>
			<h4 className="font-semibold leading-normal">Disclaimer</h4>
		</div>
		<p className="leading-relaxed">
			This e-commerce website is for demonstration purposes only. Visitors are advised not to enter
			sensitive information, such as credit or debit card details. Please use the following card for
			testing:
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

export default Disclaimer;
