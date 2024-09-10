import { type FC } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { type DashboardDataResponse } from "@/@types/workshops";

type CourseAboutHeadProps = {
	isHidden: boolean;
	dashboardData: DashboardDataResponse;
	handleOpenVideo: (id: string) => void;
};

export const CourseAboutHead: FC<CourseAboutHeadProps> = ({ isHidden, dashboardData, handleOpenVideo }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	return (
		<div className={`dashboard__content ${isHidden ? "dashboard__content--hidden" : ""}`}>
			<h2 className="dashboard__title">{t("dashboard.title5")}</h2>
			{dashboardData.groupTherapy.length && dashboardData.groupTherapy[0].lectures.length ? (
				<div className="dashboardCourseAboutHead">
					{dashboardData.groupTherapy[0].lectures.map((lecture, index) => (
						<div>
							<p className="dashboardCourseAboutHead__week">
								{index + 1}
								{t("dashboard.week")}
							</p>
							<article className="dashboardCourseAboutHead__article">
								<div className="dashboardCourseAboutHead__text">
									<p className="dashboardCourseAboutHead__title">{lecture.name[lang]}</p>
									<p className="dashboardCourseAboutHead__time">{lecture.videoDurationFormatted}</p>
								</div>
								<div className="dashboardCourseAboutHead__dec">
									<svg
										width="11"
										height="14"
										fill="none"
										viewBox="0 0 11 14"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M0 1.80618C0 1.03639 0.833322 0.555259 1.49999 0.940147L10.5015 6.13702C11.1682 6.52192 11.1682 7.48419 10.5015 7.86909L1.49999 13.066C0.833324 13.4508 0 12.9697 0 12.1999V1.80618Z"
											fill="currentColor"
										/>
									</svg>
								</div>
								<button
									type="button"
									className="dashboardCourseAboutHead__btn"
									onClick={() => {
										handleOpenVideo(lecture.recordedVideoId);
									}}
								>
									{t("dashboard.open")}
								</button>
							</article>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};
