import { type FC, useEffect, useRef, useState } from "react";

import { DashboardEmpty } from "../DashboardEmpty";
import { DashboardQuizzes } from "../DashboardQuizzes";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { type DashboardQuizzesResponse } from "@/@types/dashboard";

type QuizzesProps = {
	isHidden: boolean;
	handleAuthorized: (value: boolean) => void;
};

export const Quizzes: FC<QuizzesProps> = ({ isHidden, handleAuthorized }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	const loaderMoreRef = useRef<HTMLDivElement>(null);

	const [isVisible, setVisible] = useState(false);
	const [isVisibleScrollToTop, setVisibleScrollToTop] = useState(false);

	const [loading, setLoading] = useState(true);
	const [isFetchingNextPage, seFetchingNextPage] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [dashboardQuizzes, setDashboardQuizzes] = useState<DashboardQuizzesResponse | null>(null);

	const callbackFunction = (entries: IntersectionObserverEntry[]) => {
		const [entry] = entries;
		setVisible(entry.isIntersecting);
	};

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};

	const getQuizzesData = async (isNext: boolean) => {
		try {
			if (isNext) {
				seFetchingNextPage(true);
			} else {
				setLoading(true);
			}

			const response = await fetch(
				`${import.meta.env.PUBLIC_API_URL}/quiz/submit/by-email?limit=4&page=${
					dashboardQuizzes?.nextPage || ""
				}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				},
			);

			if (!response.ok && response.status === 401) {
				setLoading(false);
				seFetchingNextPage(true);
				handleAuthorized(false);

				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("dashboardEmail");
				window.dispatchEvent(new Event("storage"));
				return;
			}

			if (!response.ok) {
				throw new Error(t("errors.sendData"));
			}

			const data = (await response.json()) as DashboardQuizzesResponse;

			if (isNext) {
				setDashboardQuizzes((prev) =>
					prev
						? {
								data: [...prev.data, ...data.data],
								numberOfPages: data.numberOfPages,
								numberOfTests: data.numberOfTests,
								nextPage: data.nextPage,
							}
						: data,
				);
			} else {
				setDashboardQuizzes(data);
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			if (isNext) {
				seFetchingNextPage(false);
			} else {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		getQuizzesData(false);
	}, []);

	useEffect(() => {
		if (isVisible) {
			getQuizzesData(true);
		}
	}, [isVisible]);

	useEffect(() => {
		const observer = new IntersectionObserver(callbackFunction, options);

		if (loaderMoreRef.current) observer.observe(loaderMoreRef.current);

		return () => {
			if (loaderMoreRef.current) observer.unobserve(loaderMoreRef.current);
		};
	}, [loaderMoreRef, options]);

	useEffect(() => {
		const handleVisibleButton = () => {
			const position = window.scrollY;

			if (position > 50) {
				setVisibleScrollToTop(true);
			} else {
				setVisibleScrollToTop(false);
			}
		};

		window.addEventListener("scroll", handleVisibleButton);

		return () => window.removeEventListener("scroll", handleVisibleButton);
	});

	return (
		<div className={`dashboard__content ${isHidden ? "dashboard__content--hidden" : ""}`}>
			{loading ? (
				<div className="loader loader--active loader--grey">
					<div className="loader__dot"></div>
					<div className="loader__dot"></div>
					<div className="loader__dot"></div>
				</div>
			) : error ? (
				<p className="dashboard__error">{error}</p>
			) : dashboardQuizzes && dashboardQuizzes.data.length ? (
				<>
					<DashboardQuizzes dashboardQuizzes={dashboardQuizzes} />
					{isVisibleScrollToTop && (
						<button
							type="button"
							aria-label="К началу страницы"
							className="dashboard__scrollToTop"
							onClick={() => {
								window.scrollTo({
									top: 0,
									left: 0,
									behavior: "smooth",
								});
							}}
						>
							<svg
								width="24"
								height="24"
								fill="none"
								aria-hidden="true"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g opacity="0.3">
									<path
										d="M7 14L12 9L17 14"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</svg>
						</button>
					)}
					{dashboardQuizzes.nextPage && (
						<div ref={loaderMoreRef} className="dashboardHistory__loaderMore"></div>
					)}
					{isFetchingNextPage && (
						<div className="loader loader--active loader--grey" style={{ marginTop: "10px" }}>
							<div className="loader__dot"></div>
							<div className="loader__dot"></div>
							<div className="loader__dot"></div>
						</div>
					)}
				</>
			) : (
				<DashboardEmpty type="quizzes" />
			)}
		</div>
	);
};
