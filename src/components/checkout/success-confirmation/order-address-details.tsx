import type { AddressRecord } from "@/types/domain.types";

import {
	CostPanel,
	CostPanelBlock,
	CostPanelContent,
	CostPanelHeader,
	CostPanelTitle,
} from "@/components/ui/cost-panel";

import { getCountryName, getStateName } from "@/lib/utils/general/location";

const OrderAddressDetails = ({ title, address }: { title: string; address: AddressRecord }) => {
	const { firstName, lastName, phone, country, state, city, street, zip } = address;
	const countryName = getCountryName({ isoCode: country });
	const stateName = getStateName({ countryCode: country, stateCode: state });

	return (
		<CostPanel>
			<CostPanelHeader>
				<CostPanelTitle asChild>
					<h3 className="text-center !text-base">{title}</h3>
				</CostPanelTitle>
			</CostPanelHeader>
			<CostPanelContent>
				<CostPanelBlock hideDivider>
					<div className="text-sm text-neutral-900">
						<div className="flex flex-col items-center justify-center space-y-3 font-medium sm:flex-row sm:space-y-0">
							<div className="flex items-center sm:border-r sm:border-neutral-50 sm:pr-5">
								{firstName || lastName ? (
									<div className="flex items-center space-x-1">
										<span>{firstName}</span>
										<span>{lastName}</span>
									</div>
								) : (
									<span>---</span>
								)}
							</div>
							<div className="flex items-center sm:pl-5">{phone ?? "---"}</div>
						</div>
						<div className="mt-4 text-center font-light">
							<span>
								<span>{street}</span>&#44;
							</span>
							{city && <span className="ml-1">{city}&#44;</span>}
							<span className="ml-1">
								<span>{stateName}</span>
								<span className="ml-1">{zip}</span>&#44;
							</span>
							<span className="ml-1">{countryName}</span>
						</div>
					</div>
				</CostPanelBlock>
			</CostPanelContent>
		</CostPanel>
	);
};

export { OrderAddressDetails };
