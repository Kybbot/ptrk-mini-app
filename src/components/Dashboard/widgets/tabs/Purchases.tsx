import { type FC } from "react";

import { DashboardEmpty } from "../DashboardEmpty";
import { DashboardSeminars } from "../DashboardSeminars";
import { DashboardWoorkbook } from "../DashboardWoorkbook";

import { type DashboardDataResponse } from "@/@types/workshops";

type PurchasesProps = {
	isHidden: boolean;
	dashboardData: DashboardDataResponse;
	handleOpenVideo: (id: string) => void;
};

export const Purchases: FC<PurchasesProps> = ({ isHidden, dashboardData, handleOpenVideo }) => {
	return (
		<div className={`dashboard__content ${isHidden ? "dashboard__content--hidden" : ""}`}>
			{dashboardData && (dashboardData.seminars.length || dashboardData.workbooks.length) ? (
				<>
					<DashboardWoorkbook dashboardData={dashboardData} handleOpenVideo={handleOpenVideo} />
					<DashboardSeminars dashboardData={dashboardData} handleOpenVideo={handleOpenVideo} />
				</>
			) : (
				<DashboardEmpty type="seminars" />
			)}
		</div>
	);
};
