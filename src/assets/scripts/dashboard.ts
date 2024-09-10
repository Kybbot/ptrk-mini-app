import { getLangFromUrl, useTranslations } from "../i18n/utils";

import { getCurrency } from "@/utils/getCurrency";
import { getCountryByIP } from "@/utils/getCountryByIP";

const lang = getLangFromUrl(location);
const t = useTranslations(lang);

const workshopModal = document.querySelector("#workshopModal") as HTMLDivElement;
const closeWorkshopModal = document.querySelector("#closeWorkshopModal") as HTMLButtonElement;
const workshopModalForm = document.querySelector(".workshopModal__form") as HTMLFormElement;

const workshopModalPromo = document.querySelector("#workshopModalPromo") as HTMLDivElement;
const promoCodeInput = document.querySelector("#promoCode") as HTMLInputElement;
const applyPromoCodeButton = document.querySelector("#applyPromoCode") as HTMLButtonElement;
const workshopModalPromoSuccess = document.querySelector(
	"#workshopModalPromoSuccess",
) as HTMLParagraphElement;
const workshopModalPromoError = document.querySelector("#workshopModalPromoError") as HTMLParagraphElement;

const workshopModalSubmit = document.querySelector("#workshopModalSubmit") as HTMLButtonElement;

const priceData = document.querySelector(".workshopModal__result--bold") as HTMLSpanElement;
const workshopModalResult = document.querySelector(".workshopModal__message") as HTMLParagraphElement;

const WORKBOOK_SALE = 200;
const WORKBOOK_PRICE = 1200;

// Close modal
workshopModal.addEventListener("click", (event) => {
	const target = event.target as HTMLElement;

	if (target.classList.contains("workshopModal") || target.classList.contains("modal__content")) {
		workshopModalForm.reset();
		document.body.style.overflow = "initial";
		workshopModal.classList.remove("workshopModal--visible");

		promoCodeInput.readOnly = false;
		workshopModalPromo.style.display = "none";
		applyPromoCodeButton.style.display = "block";
		workshopModalPromoError.style.display = "none";
		workshopModalPromoSuccess.style.display = "none";
	}
});

closeWorkshopModal.addEventListener("click", () => {
	workshopModalForm.reset();
	document.body.style.overflow = "initial";
	workshopModal.classList.remove("workshopModal--visible");

	promoCodeInput.readOnly = false;
	workshopModalPromo.style.display = "none";
	applyPromoCodeButton.style.display = "block";
	workshopModalPromoError.style.display = "none";
	workshopModalPromoSuccess.style.display = "none";
});

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && workshopModal?.classList.contains("workshopModal--visible")) {
		workshopModalForm.reset();
		document.body.style.overflow = "initial";
		workshopModal.classList.remove("workshopModal--visible");

		promoCodeInput.readOnly = false;
		workshopModalPromo.style.display = "none";
		applyPromoCodeButton.style.display = "block";
		workshopModalPromoError.style.display = "none";
		workshopModalPromoSuccess.style.display = "none";
	}
});

promoCodeInput.addEventListener("input", () => {
	workshopModalPromoError.style.display = "none";
});

applyPromoCodeButton.addEventListener("click", () => {
	if (promoCodeInput.value.toLowerCase() === "happy200") {
		priceData.textContent = getCurrency(WORKBOOK_PRICE - WORKBOOK_SALE);
		workshopModalPromoSuccess.style.display = "flex";
		workshopModalPromoError.style.display = "none";
		applyPromoCodeButton.style.display = "none";
		promoCodeInput.readOnly = true;
	} else {
		workshopModalPromoError.style.display = "block";
	}
});

workshopModalForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	workshopModalResult.textContent = "";

	const formData = new FormData(workshopModalForm);
	const userEmail = formData.get("userEmail");
	const workshop = formData.get("workshop");
	const promoCode = formData.get("promoCode");

	if (userEmail && workshop) {
		workshopModalSubmit.disabled = true;
		workshopModalSubmit.classList.add("workshopModal__button--loading");

		const address = await getCountryByIP();
		const referralCode = localStorage.getItem("referralCode");

		const requestBody = {
			...(workshopModal.dataset.isWorkbook === "true"
				? {
						workbookIds: [1],
					}
				: {
						seminarIds: [+workshop],
					}),
			...(promoCode ? { promoCode } : {}),
			email: userEmail,
			phone: "",
			firstName: "",
			addressFe: address,
			lang: lang,
			utmContent: "dashboard",
			tgMiniApp: true,
			...(referralCode ? { referralCode } : {}),
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
