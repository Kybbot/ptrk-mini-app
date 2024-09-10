import { type FC } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { type DashboardDataResponse } from "@/@types/workshops";

type DashboardWoorkbookProps = {
	dashboardData: DashboardDataResponse;
	handleOpenVideo: (id: string) => void;
};

export const DashboardWoorkbook: FC<DashboardWoorkbookProps> = ({ dashboardData, handleOpenVideo }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	return (
		<>
			{dashboardData.workbooks.length ? (
				<>
					<h2 className="dashboard__title">{t("dashboard.title2")}</h2>
					<div className="dashboardWorkbook">
						{dashboardData.workbooks[0].recordedVideoId && (
							<div className="dashboardWorkbook__video">
								<img
									aria-hidden="true"
									className="dashboardWorkbook__preview"
									src={dashboardData.workbooks[0].preview}
									alt={dashboardData.workbooks[0].videoName[lang]}
								/>
								<svg
									width="40"
									height="40"
									fill="none"
									aria-hidden="true"
									viewBox="0 0 40 40"
									className="dashboardWorkbook__dec"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_1213_6893)">
										<mask
											id="mask0_1213_6893"
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
										<g mask="url(#mask0_1213_6893)">
											<path d="M0 0H40V40H0V0Z" fill="white" />
										</g>
									</g>
									<defs>
										<clipPath id="clip0_1213_6893">
											<rect width="40" height="40" rx="20" fill="white" />
										</clipPath>
									</defs>
								</svg>
								<button
									type="button"
									className="dashboardWorkbook__play"
									onClick={() => {
										handleOpenVideo(dashboardData.workbooks[0].recordedVideoId);
									}}
								>
									{t("dashboard.open")}
								</button>
							</div>
						)}
						<div className="dashboardWorkbook__data">
							<article className="dashboardWorkbook__card">
								<div className="dashboardWorkbook__left">
									<h3 className="dashboardWorkbook__title">{t("dashboardWorkbook.titel")}</h3>
									<p className="dashboardWorkbook__text">{t("dashboardWorkbook.text1")}</p>
								</div>
								<div className="dashboardWorkbook__right">
									<a
										target="_blank"
										rel="noopener noreferrer"
										className="dashboardWorkbook__lang"
										href={dashboardData.workbooks[0].linkToEmptyFileUa}
									>
										<span className="dashboardWorkbook__lang--span">UA</span>
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										className="dashboardWorkbook__lang"
										href={dashboardData.workbooks[0].linkToEmptyFileRu}
									>
										<span className="dashboardWorkbook__lang--span">RU</span>
									</a>
								</div>
							</article>
							<article className="dashboardWorkbook__card">
								<div className="dashboardWorkbook__left">
									<h3 className="dashboardWorkbook__title">{t("dashboardWorkbook.titel")}</h3>
									<p className="dashboardWorkbook__text">{t("dashboardWorkbook.text2")}</p>
								</div>
								<div className="dashboardWorkbook__right">
									<a
										target="_blank"
										rel="noopener noreferrer"
										className="dashboardWorkbook__lang"
										href={dashboardData.workbooks[0].linkToFilledFileUa}
									>
										<span className="dashboardWorkbook__lang--span">UA</span>
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										className="dashboardWorkbook__lang"
										href={dashboardData.workbooks[0].linkToFilledFileRu}
									>
										<span className="dashboardWorkbook__lang--span">RU</span>
									</a>
								</div>
							</article>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};
