import { type FC, useState, type MouseEvent, useEffect } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { DashboardModal } from "../widgets/DashboardModal";
import { DashboardOffers } from "../widgets/DashboardOffers";

import { Quizzes } from "../widgets/tabs/Quizzes";
import { Purchases } from "../widgets/tabs/Purchases";
import { CourseAboutHead } from "../widgets/tabs/CourseAboutHead";

import { type DashboardDataResponse } from "@/@types/workshops";

type MainProps = {
	handleAuthorized: (value: boolean) => void;
};

export const Main: FC<MainProps> = ({ handleAuthorized }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	const [currentTab, setCurrentTab] = useState<"first" | "second" | "third">("first");

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [dashboardData, setDashboardData] = useState<DashboardDataResponse | null>(null);

	const [videoId, setVideoId] = useState<string | null>(null);
	const [showDashboardModal, setShowDashboardModal] = useState(false);

	const handleTabs = (event: MouseEvent<HTMLButtonElement>) => {
		const target = event.target as HTMLButtonElement;

		target.scrollIntoView({ block: "nearest", inline: "start", behavior: "smooth" });

		const value = target.dataset.value as "first" | "second" | "third" | undefined;

		if (value) setCurrentTab(value);
	};

	const handleDashboardData = (value: DashboardDataResponse | null) => {
		setDashboardData(value);
	};

	const handleShowDashboardModal = () => {
		setVideoId(null);
		setShowDashboardModal((prev) => !prev);
	};

	const handleOpenVideo = (id: string) => {
		setVideoId(id);
		setShowDashboardModal(true);
	};

	useEffect(() => {
		const getWorkshopsData = async () => {
			try {
				setLoading(true);

				const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/orders/by-email`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});

				if (!response.ok && response.status === 401) {
					setLoading(false);
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

				const data = (await response.json()) as DashboardDataResponse;

				setDashboardData(data);
				handleDashboardData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		};

		getWorkshopsData();
	}, []);

	return (
		<section className="dashboard">
			<div className="dashboard__main">
				<h1 className="srOnly">{t("dashboard.name")}</h1>
				{loading ? (
					<div className="loader loader--active loader--grey">
						<div className="loader__dot"></div>
						<div className="loader__dot"></div>
						<div className="loader__dot"></div>
					</div>
				) : error ? (
					<p className="dashboard__error">{error}</p>
				) : dashboardData ? (
					<>
						<div className="dashboard__tabs">
							<button
								type="button"
								data-value="first"
								onClick={handleTabs}
								className="dashboard__tab"
								disabled={currentTab === "first"}
							>
								{t("dashboard.tab1")}
							</button>
							{dashboardData.groupTherapy.length && dashboardData.groupTherapy[0].lectures.length ? (
								<button
									type="button"
									data-value="second"
									onClick={handleTabs}
									className="dashboard__tab"
									disabled={currentTab === "second"}
								>
									{t("dashboard.tab2")}
								</button>
							) : null}
							<button
								type="button"
								data-value="third"
								onClick={handleTabs}
								className="dashboard__tab"
								disabled={currentTab === "third"}
							>
								{t("dashboard.tab3")}
							</button>
						</div>

						<div>
							<Purchases
								dashboardData={dashboardData}
								isHidden={currentTab !== "first"}
								handleOpenVideo={handleOpenVideo}
							/>
							<CourseAboutHead
								dashboardData={dashboardData}
								isHidden={currentTab !== "second"}
								handleOpenVideo={handleOpenVideo}
							/>
							<Quizzes isHidden={currentTab !== "third"} handleAuthorized={handleAuthorized} />
							{dashboardData && <DashboardOffers dashboardData={dashboardData} />}
							{videoId && (
								<DashboardModal
									videoId={videoId}
									showDashboardModal={showDashboardModal}
									handleShowDashboardModal={handleShowDashboardModal}
								/>
							)}
						</div>
					</>
				) : null}
			</div>
		</section>
	);
};
