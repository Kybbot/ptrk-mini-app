import { type FC, type MouseEvent } from "react";

import { workbooks } from "@/assets/constants/workbooks";
import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { type Workbook } from "@/@types/workshops";

interface WorkshopCardProps {
	workbook: Workbook;
}

export const DashboardWorkbookCard: FC<WorkshopCardProps> = ({ workbook }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		const workshopModal = document.querySelector("#workshopModal") as HTMLDivElement;
		const oneWorkshopLabel = document.querySelector("#oneWorkshopLabel") as HTMLLabelElement;
		const allWorkshopLabel = document.querySelector("#allWorkshopLabel") as HTMLLabelElement;
		const oneWorkshopInput = document.querySelector("#oneWorkshop") as HTMLInputElement;
		const oneWorkshopTitle = document.querySelector("#oneWorkshopTitle") as HTMLSpanElement;
		const workshopModalPromo = document.querySelector("#workshopModalPromo") as HTMLDivElement;
		const priceData = document.querySelector(".workshopModal__result--bold") as HTMLSpanElement;
		const userEmail = document.querySelector("#userEmail") as HTMLInputElement;

		const dataValue = event.currentTarget.dataset.value || "";

		const workbook = workbooks.find((workbook) => workbook.id.toString() === dataValue);
		if (!workbook) return;

		allWorkshopLabel.style.display = "none";
		const title = workbook.title[lang];
		const price = `${workbook.priceUAH}`;

		oneWorkshopLabel.style.display = "flex";
		workshopModalPromo.style.display = "flex";

		oneWorkshopInput.checked = true;
		oneWorkshopInput.value = dataValue;

		oneWorkshopTitle.textContent = `${title}`;
		priceData.textContent = price;

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
		workshopModal.dataset.isWorkbook = "true";
		workshopModal.classList.add("workshopModal--visible");
	};

	return (
		<article className="dashboardWorkshop">
			<div className="dashboardWorkshop__content">
				<div className="dashboardWorkshop__text">
					<div className="dashboardWorkshop__header">
						<h2 className="dashboardWorkshop__title">{workbook.title[lang]}</h2>
						<span className="dashboardWorkshop__tag dashboardWorkshop__tag--pdf">PDF</span>
					</div>
					<p className="dashboardWorkshop__description">{workbook.description[lang]}</p>
				</div>
				<div className="dashboardWorkshop__meta">
					<hr className="dashboardWorkshop__hr" />
					<div className="dashboardWorkshop__details dashboardWorkshop__details--one">
						<p className="dashboardWorkshop__detail">
							<span className="dashboardWorkshop__detail--small">{t("workshopCard.price")}</span>
							<span className="dashboardWorkshop__detail--bold">{workbook.priceUAH}</span>
						</p>
					</div>
					<button
						type="button"
						data-value={workbook.id}
						onClick={handleButtonClick}
						className="dashboardWorkshop__button"
					>
						{t("workshopCard.buy2")}
					</button>
				</div>
			</div>
		</article>
	);
};
