import { type FC } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { getDate } from "@/utils/getDate";

import { type DashboardDataResponse } from "@/@types/workshops";

type DashboardSeminarsProps = {
	dashboardData: DashboardDataResponse;
	handleOpenVideo: (id: string) => void;
};

export const DashboardSeminars: FC<DashboardSeminarsProps> = ({ dashboardData, handleOpenVideo }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	return (
		<>
			{dashboardData.seminars.length ? (
				<>
					<h2 className="dashboard__title">{t("dashboard.title3")}</h2>
					<div id="dashboardContentFirst" className="dashboard__records">
						{dashboardData.seminars.map((workshop) => (
							<article className="dashboardCard" key={workshop.id}>
								<img
									className="dashboardCard__img"
									src={workshop.preview}
									alt={workshop.name[lang]}
									aria-hidden="true"
								/>
								<h2 className="dashboardCard__title">{workshop.name[lang]}</h2>
								{workshop.linkToRecordedSeminar ? (
									<>
										<p className="dashboardCard__time">{workshop.videoDurationFormatted}</p>
										<svg
											width="40"
											height="40"
											fill="none"
											aria-hidden="true"
											viewBox="0 0 40 40"
											className="dashboardCard__svg"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g clip-path="url(#clip0_1213_6942)">
												<mask
													id="mask0_1213_6942"
													maskUnits="userSpaceOnUse"
													x="-1"
													y="-1"
													width="42"
													height="42"
												>
													<path
														d="M20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40Z"
														fill="white"
														stroke="white"
														stroke-width="0.833333"
														stroke-linejoin="round"
													/>
													<path
														d="M16 19.9983V14.8023C16 14.0325 16.8333 13.5514 17.5 13.9363L22 16.5343L26.4999 19.1323C27.1666 19.5172 27.1666 20.4794 26.4999 20.8643L22 23.4623L17.5 26.0603C16.8333 26.4452 16 25.9641 16 25.1943V19.9983Z"
														fill="black"
														stroke="black"
														stroke-width="0.833333"
														stroke-linejoin="round"
													/>
												</mask>
												<g mask="url(#mask0_1213_6942)">
													<path d="M0 0H40V40H0V0Z" fill="white" />
												</g>
											</g>
											<defs>
												<clipPath id="clip0_1213_6942">
													<rect width="40" height="40" rx="20" fill="white" />
												</clipPath>
											</defs>
										</svg>
										<button
											type="button"
											className="dashboardCard__btn"
											onClick={() => {
												handleOpenVideo(workshop.linkToRecordedSeminar);
											}}
										>
											{t("dashboard.open")}
										</button>
									</>
								) : (
									<p className="dashboardCard__time">
										{t("dashboard.time")} {getDate(workshop.date, true, lang)}
									</p>
								)}
							</article>
						))}
					</div>
				</>
			) : null}
		</>
	);
};
