import { getLangFromUrl, useTranslations } from "../i18n/utils";

import { getCountryByIP } from "@/utils/getCountryByIP";

const lang = getLangFromUrl(location);
const t = useTranslations(lang);

const subbotnikBuy = document.querySelector("#subbotnikBuy") as HTMLButtonElement;
const workshopModal = document.querySelector("#workshopModal") as HTMLDivElement;
const closeWorkshopModal = document.querySelector("#closeWorkshopModal") as HTMLButtonElement;

const workshopModalForm = document.querySelector(".workshopModal__form") as HTMLFormElement;

const userEmail = document.querySelector("#userEmail") as HTMLInputElement;

const allWorkshopLabel = document.querySelector("#allWorkshopLabel") as HTMLLabelElement;
const oneWorkshopInput = document.querySelector("#oneWorkshop") as HTMLInputElement;
const oneWorkshopTitle = document.querySelector("#oneWorkshopTitle") as HTMLSpanElement;

const priceData = document.querySelector(".workshopModal__result--bold") as HTMLSpanElement;

const workshopModalErrorMessage = document.querySelector(
	"#workshopModalErrorMessage",
) as HTMLParagraphElement;
const workshopModalSubmit = document.querySelector("#workshopModalSubmit") as HTMLButtonElement;
const workshopModalResult = document.querySelector(".workshopModal__message") as HTMLParagraphElement;

// Open workshop modal
subbotnikBuy.addEventListener("click", () => {
	oneWorkshopInput.checked = true;
	oneWorkshopInput.value = "2";

	allWorkshopLabel.style.display = "none";
	workshopModalErrorMessage.textContent = "";
	workshopModalErrorMessage.style.display = "none";

	oneWorkshopTitle.textContent = t("subbotnik.title");
	priceData.textContent = "4 999 ₴";

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

// Submit form
workshopModalForm?.addEventListener("submit", async (event) => {
	event.preventDefault();

	workshopModalResult.textContent = "";
	workshopModalErrorMessage.textContent = "";
	workshopModalErrorMessage.style.display = "none";

	const formData = new FormData(workshopModalForm);
	const userEmail = formData.get("userEmail");

	if (userEmail) {
		workshopModalSubmit.disabled = true;
		workshopModalSubmit.classList.add("workshopModal__button--loading");

		const address = await getCountryByIP();
		const referralCode = localStorage.getItem("referralCode");
		const utmContent = new URLSearchParams(location.search).get("utmContent");

		const requestBody = {
			groupTherapy: {
				id: 2,
				date: "",
			},
			workbookIds: [1],
			email: userEmail,
			phone: "",
			firstName: "",
			addressFe: address,
			lang: lang,
			tgMiniApp: true,
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

			const data = await response.json();

			if (!response.ok) {
				throw new Error(`${t("errors.sendData")}`);
			}

			localStorage.setItem("workshopModalEmail", userEmail.toString());
			location.assign(data.results.payLink);

			workshopModalForm.reset();
		} catch (error) {
			if (error instanceof Error) {
				workshopModalResult.textContent = error.message;
			}
		} finally {
			workshopModalSubmit.disabled = false;
			workshopModalSubmit.classList.remove("workshopModal__button--loading");
		}
	}
});
