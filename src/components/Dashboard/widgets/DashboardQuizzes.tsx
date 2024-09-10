import { type FC } from "react";

import { quiz as quiz2 } from "@/assets/constants/quiz2";
import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { getDate } from "@/utils/getDate";
import calculateGrade from "@/utils/calculateGrade";

import { type DashboardQuizzesResponse } from "@/@types/dashboard";

type DashboardQuizzesProps = {
	dashboardQuizzes: DashboardQuizzesResponse;
};

export const DashboardQuizzes: FC<DashboardQuizzesProps> = ({ dashboardQuizzes }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	return (
		<div className="dashboardQuizzes">
			<h2 className="dashboard__title">{t("dashboard.title4")}</h2>
			<div className="dashboardQuizzes__container">
				{dashboardQuizzes.data.map((quiz, quizIndex) => (
					<article className="dashboardQuize" key={quizIndex}>
						<div className="dashboardQuize__header">
							<h3 className="dashboardQuize__title">{quiz.title[lang]}</h3>
							<p className="dashboardQuize__date">{getDate(quiz.date, false, lang)}</p>
						</div>
						{quiz.testNumber === 2 && Array.isArray(quiz.result) ? (
							<>
								{quiz.result.some((item) => item > 3) ? (
									<p className="dashboardQuize__description">
										{t("dashboard.description1")}{" "}
										<span className="dashboardQuize__description--bold">
											{quiz.result
												.map((item, index) => (item > 3 ? `${quiz2.ratings[index].result[lang]}` : undefined))
												.filter((value) => value !== undefined)
												.join(", ")}
											.
										</span>
									</p>
								) : (
									<p className="dashboardQuize__description">{t("dashboard.description3")}</p>
								)}
							</>
						) : (
							<p className="dashboardQuize__description">
								{t("dashboard.description2")}{" "}
								<span className="dashboardQuize__description--bold">
									- {calculateGrade(quiz.points, quiz.maxPoints)}/5 (
									{Array.isArray(quiz.result) ? "" : quiz.result[lang]})
								</span>
							</p>
						)}
						<a href={quiz.urls[lang]} className="dashboardQuize__link">
							{t("dashboard.link")}
						</a>
					</article>
				))}
			</div>
		</div>
	);
};
