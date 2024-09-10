import { type FC, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SwiperNavigation } from "../features/SwiperNavigation";
import { DashboardWorkbookCard } from "../features/DashboardWorkbookCard";
import { DashboardWorkshopCard } from "../features/DashboardWorkshopCard";

import { workbooks } from "@/assets/constants/workbooks";
import { workshops } from "@/components/Workshops/constants";
import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { type DashboardDataResponse } from "@/@types/workshops";

type DashboardOffersProps = {
	dashboardData: DashboardDataResponse;
};

export const DashboardOffers: FC<DashboardOffersProps> = ({ dashboardData }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	const workbooksToPurchase = useMemo(() => {
		return workbooks.filter((workbook) => {
			const isPurchased = dashboardData.workbooks.some((item) => item.id === workbook.id);

			return !isPurchased;
		});
	}, [dashboardData]);

	const workshopsToPurchase = useMemo(() => {
		return workshops.filter((workshop) => {
			const isPurchased = dashboardData.seminars.some((item) => item.id === workshop.id);

			return !isPurchased;
		});
	}, [dashboardData]);

	return (
		<>
			{(workshopsToPurchase && workshopsToPurchase.length) ||
			(workbooksToPurchase && workbooksToPurchase.length) ? (
				<div className="dashboardOffers">
					<h2 className="dashboard__title">{t("dashboard.title1")}</h2>
					<div className="dashboardOffers__wrapper">
						<Swiper
							slidesPerView={1}
							modules={[A11y]}
							breakpoints={{
								768: {
									slidesPerView: 2,
								},
								1024: {
									slidesPerView: 2,
									spaceBetween: 24,
								},
							}}
						>
							{workbooksToPurchase.map((workbook) => (
								<SwiperSlide key={workbook.id} style={{ height: "initial" }}>
									<DashboardWorkbookCard workbook={workbook} />
								</SwiperSlide>
							))}
							{workshopsToPurchase.map((workshop) => (
								<SwiperSlide key={workshop.id} style={{ height: "initial" }}>
									<DashboardWorkshopCard workshop={workshop} />
								</SwiperSlide>
							))}
							{workshopsToPurchase.length > 1 ? (
								<SwiperNavigation workshopsCount={workshopsToPurchase.length + workbooksToPurchase.length} />
							) : null}
						</Swiper>
					</div>
				</div>
			) : null}
		</>
	);
};
