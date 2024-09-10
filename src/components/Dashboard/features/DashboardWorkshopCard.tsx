import { type FC, type MouseEvent } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { workshops } from "@/components/Workshops/constants";

import { getDate } from "@/utils/getDate";

import { type Workshop } from "@/@types/workshops";

interface WorkshopCardProps {
	workshop: Workshop;
}

export const DashboardWorkshopCard: FC<WorkshopCardProps> = ({ workshop }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		const workshopModal = document.querySelector("#workshopModal") as HTMLDivElement;
		const oneWorkshopLabel = document.querySelector("#oneWorkshopLabel") as HTMLLabelElement;
		const allWorkshopLabel = document.querySelector("#allWorkshopLabel") as HTMLLabelElement;
		const oneWorkshopInput = document.querySelector("#oneWorkshop") as HTMLInputElement;
		const oneWorkshopTitle = document.querySelector("#oneWorkshopTitle") as HTMLSpanElement;
		const allWorkshop = document.querySelector("#allWorkshop") as HTMLInputElement;
		const priceData = document.querySelector(".workshopModal__result--bold") as HTMLSpanElement;
		const userEmail = document.querySelector("#userEmail") as HTMLInputElement;

		const dataValue = event.currentTarget.dataset.value;

		if (dataValue === "5") {
			oneWorkshopLabel.style.display = "none";
			allWorkshop.checked = true;
			priceData.textContent = "2 000₴";
		} else if (dataValue) {
			const workshop = workshops.find((workshop) => workshop.id.toString() === dataValue);
			if (!workshop) return;

			allWorkshopLabel.style.display = "none";
			const title = workshop.title[lang];
			const price = `${workshop.priceUAH}`;

			oneWorkshopLabel.style.display = "flex";
			oneWorkshopInput.checked = true;
			oneWorkshopInput.value = dataValue;
			oneWorkshopTitle.textContent = `${t("workshopModal.oneWorkshopTitle")} «${title}»`;
			priceData.textContent = price;
		}

		// User Email Input
		const dashboardEmail = localStorage.getItem("dashboardEmail");
		const workshopModalEmail = localStorage.getItem("workshopModalEmail");

		if (dashboardEmail) {
			userEmail.value = dashboardEmail;
		} else if (workshopModalEmail) {
			userEmail.value = workshopModalEmail;
		} else {
			userEmail.value = "";
		}

		document.body.style.overflow = "hidden";
		workshopModal.dataset.isWorkbook = "false";
		workshopModal?.classList.add("workshopModal--visible");
	};

	return (
		<article className="dashboardWorkshop">
			<div className="dashboardWorkshop__content">
				<div className="dashboardWorkshop__text">
					<div className="dashboardWorkshop__header">
						<h2 className="dashboardWorkshop__title">{workshop.title[lang]}</h2>
						{workshop.record ? (
							<span className="dashboardWorkshop__tag">
								{t("workshopCard.tag1")} {getDate(workshop.date, true, lang)}
							</span>
						) : (
							<span className="dashboardWorkshop__tag dashboardWorkshop__tag--blue">
								{t("workshopCard.tag2")} {getDate(workshop.date, true, lang)}
							</span>
						)}
					</div>
					<p className="dashboardWorkshop__description">{workshop.description[lang]}</p>
				</div>
				<div className="dashboardWorkshop__meta">
					<hr className="dashboardWorkshop__hr" />
					<div
						className={`dashboardWorkshop__details ${
							workshop.record ? "dashboardWorkshop__details--one" : ""
						}`}
					>
						<p className="dashboardWorkshop__detail">
							<span className="dashboardWorkshop__detail--small">{t("workshopCard.time")}</span>
							<span className="dashboardWorkshop__detail--bold">
								{workshop.timing} {t("workshopCard.timeText")}
							</span>
						</p>
						<p className="dashboardWorkshop__detail">
							<span className="dashboardWorkshop__detail--small">{t("workshopCard.price")}</span>
							<span className="dashboardWorkshop__detail--bold">{workshop.priceUAH}</span>
						</p>
						{!workshop.record && (
							<p className="dashboardWorkshop__detail">
								<span className="dashboardWorkshop__detail--small">{t("workshopCard.start")}</span>
								<span className="dashboardWorkshop__detail--bold">
									{workshop.start} ({t("workshopCard.startText")})
								</span>
							</p>
						)}
					</div>
					<button
						type="button"
						data-value={workshop.id}
						onClick={handleButtonClick}
						className="dashboardWorkshop__button"
					>
						<span className="dashboardWorkshop__button--span">
							{workshop.record ? t("workshopCard.buy1") : t("workshopCard.buy2")}
						</span>
					</button>
				</div>
			</div>
		</article>
	);
};
