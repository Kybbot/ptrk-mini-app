import { getLangFromUrl, useTranslations } from "../i18n/utils";

import { workshops } from "@/components/Workshops/constants";

import { getCurrency } from "@/utils/getCurrency";
import { getCountryByIP } from "@/utils/getCountryByIP";

const lang = getLangFromUrl(location);
const t = useTranslations(lang);

// Workshops Details
const workshopsDetailsButton = document.querySelector(".workshopsDetails__button") as HTMLButtonElement;
const workshopsDetailsContent = document.querySelector(".workshopsDetails__content") as HTMLButtonElement;

workshopsDetailsButton.addEventListener("click", () => {
	if (workshopsDetailsButton.classList.contains("workshopsDetails__button--active")) {
		workshopsDetailsButton.classList.remove("workshopsDetails__button--active");
		workshopsDetailsContent.style.maxHeight = "0px";
	} else {
		workshopsDetailsButton.classList.add("workshopsDetails__button--active");
		workshopsDetailsContent.style.maxHeight = `${workshopsDetailsContent.scrollHeight}px`;
	}
});

// Workshops Tooltip
const workshopsTooltipButton = document.querySelector(".workshopsTooltip__button") as HTMLButtonElement;
const workshopsTooltipContent = document.querySelector(".workshopsTooltip__content") as HTMLDivElement;
const workshopsTooltipClose = document.querySelector(".workshopsTooltip__close") as HTMLButtonElement;

workshopsTooltipButton.addEventListener("click", () => {
	workshopsTooltipContent.classList.add("workshopsTooltip__content--active");
});

workshopsTooltipClose.addEventListener("click", () => {
	workshopsTooltipContent.classList.remove("workshopsTooltip__content--active");
});

window.addEventListener("click", (event) => {
	const target = event.target;

	if (
		target instanceof HTMLElement &&
		target !== workshopsTooltipButton &&
		!workshopsTooltipContent.contains(target) &&
		workshopsTooltipContent.classList.contains("workshopsTooltip__content--active")
	) {
		workshopsTooltipContent.classList.remove("workshopsTooltip__content--active");
	}
});

// Workshops Buy
const workshopBuyButtons = document.querySelectorAll(".workshop__buy") as NodeListOf<HTMLButtonElement>;
const workshopModal = document.querySelector("#workshopModal") as HTMLDivElement;

const userEmail = document.querySelector("#userEmail") as HTMLInputElement;

const oneWorkshopLabel = document.querySelector("#oneWorkshopLabel") as HTMLLabelElement;
const oneWorkshopInput = document.querySelector("#oneWorkshop") as HTMLInputElement;

const oneWorkshopTitle = document.querySelector("#oneWorkshopTitle") as HTMLSpanElement;

const allWorkshop = document.querySelector("#allWorkshop") as HTMLInputElement;

const workshopModalAddWorkbook = document.querySelector("#workshopModalAddWorkbook") as HTMLFieldSetElement;
const priceData = document.querySelector(".workshopModal__result--bold") as HTMLSpanElement;

let finalPrice: number;
let isWorkbookChecked = false;

const WORKBOOK_PRICE = 600;
const ONE_WORKSHOP_PRICE = 699;
const ALL_WORKSHOPS_PRICE = 2000;

for (const workshopBuyButton of workshopBuyButtons) {
	workshopBuyButton.addEventListener("click", () => {
		const dataValue = workshopBuyButton.dataset.value;

		if (dataValue === "5") {
			oneWorkshopLabel.style.display = "none";
			finalPrice = ALL_WORKSHOPS_PRICE;
			allWorkshop.checked = true;
			priceData.textContent = "2 000 ₴";
			workshopModalAddWorkbook.style.display = "block";
		} else if (dataValue) {
			const workshop = workshops.find((workshop) => workshop.id.toString() === dataValue);
			if (!workshop) return;

			const title = workshop.title[lang];
			const price = `${workshop.priceUAH}`;

			isWorkbookChecked = false;
			finalPrice = ONE_WORKSHOP_PRICE;

			oneWorkshopLabel.style.display = "flex";
			workshopModalAddWorkbook.style.display = "none";
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
		workshopModal.classList.add("workshopModal--visible");
	});
}

const closeWorkshopModal = document.querySelector("#closeWorkshopModal") as HTMLButtonElement;
const workshopModalForm = document.querySelector(".workshopModal__form") as HTMLFormElement;
const workshopModalResult = document.querySelector(".workshopModal__message") as HTMLParagraphElement;
const workshopModalSubmit = document.querySelector("#workshopModalSubmit") as HTMLButtonElement;
const radioInputs = document.querySelectorAll(".workshopModal__radio--field") as NodeListOf<HTMLInputElement>;
const workbookCheckbox = document.querySelector("#workbook") as HTMLInputElement;

// Close workshop modal
workshopModal.addEventListener("click", (event) => {
	const target = event.target as HTMLElement;

	if (target.classList.contains("workshopModal") || target.classList.contains("modal__content")) {
		workshopModalForm.reset();
		document.body.style.overflow = "initial";
		workshopModal.classList.remove("workshopModal--visible");
	}
});

closeWorkshopModal.addEventListener("click", () => {
	workshopModalForm.reset();
	document.body.style.overflow = "initial";
	workshopModal.classList.remove("workshopModal--visible");
});

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && workshopModal?.classList.contains("workshopModal--visible")) {
		workshopModalForm.reset();
		document.body.style.overflow = "initial";
		workshopModal.classList.remove("workshopModal--visible");
	}
});

// Radio inputs
for (const radioInput of radioInputs) {
	radioInput.addEventListener("change", () => {
		if (radioInput.checked && radioInput.value === "5") {
			workshopModalAddWorkbook.style.display = "block";

			finalPrice = isWorkbookChecked ? WORKBOOK_PRICE + ALL_WORKSHOPS_PRICE : ALL_WORKSHOPS_PRICE;
			priceData.textContent = getCurrency(finalPrice);
		} else if (radioInput.checked) {
			isWorkbookChecked = false;
			workbookCheckbox.checked = false;
			workshopModalAddWorkbook.style.display = "none";

			finalPrice = ONE_WORKSHOP_PRICE;
			priceData.textContent = getCurrency(finalPrice);
		}
	});
}

workbookCheckbox.addEventListener("change", (event) => {
	const target = event.currentTarget as HTMLInputElement;
	if (target.checked) {
		finalPrice = finalPrice + WORKBOOK_PRICE;
		priceData.textContent = getCurrency(finalPrice);
	} else {
		finalPrice = finalPrice - WORKBOOK_PRICE;
		priceData.textContent = getCurrency(finalPrice);
	}

	isWorkbookChecked = target.checked;
});

workshopModalForm?.addEventListener("submit", async (event) => {
	event.preventDefault();

	workshopModalResult.textContent = "";

	const formData = new FormData(workshopModalForm);
	const userEmail = formData.get("userEmail");
	const workshop = formData.get("workshop");
	const workbook = formData.get("workbook");

	if (userEmail && workshop) {
		workshopModalSubmit.disabled = true;
		workshopModalSubmit.classList.add("workshopModal__button--loading");

		const address = await getCountryByIP();
		const referralCode = localStorage.getItem("referralCode");
		const utmContent = new URLSearchParams(location.search).get("utmContent");

		const requestBody = {
			...(workbook
				? {
						seminarIds: [+workshop],
						workbookIds: [1],
				  }
				: {
						seminarIds: [+workshop],
				  }),
			email: userEmail,
			phone: "",
			firstName: "",
			addressFe: address,
			lang: lang,
			...(referralCode ? { referralCode } : {}),
			...(utmContent ? { utmContent } : {}),
		};

		try {
			const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/orders/confirm`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error(t("errors.sendData"));
			}

			const data = await response.json();

			localStorage.setItem("workshopModalEmail", userEmail.toString());
			location.assign(data.results.payLink);

			workshopModalForm.reset();
		} catch (error) {
			workshopModalResult.textContent = t("errors.sendData");
		} finally {
			workshopModalSubmit.disabled = false;
			workshopModalSubmit.classList.remove("workshopModal__button--loading");
		}
	}
});
