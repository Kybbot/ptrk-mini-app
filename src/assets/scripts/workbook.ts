import Swiper from "swiper";
import { FreeMode } from "swiper/modules";

import { getLangFromUrl, useTranslations } from "../i18n/utils";

import { getCurrency } from "@/utils/getCurrency";
import { getCountryByIP } from "@/utils/getCountryByIP";

const lang = getLangFromUrl(location);
const t = useTranslations(lang);

new Swiper("#workbookSwiper", {
	slidesPerView: "auto",
	spaceBetween: 16,
	freeMode: true,
	modules: [FreeMode],
});

// Video
const workbookPlay = document.querySelector("#workbookPlay") as HTMLButtonElement;
const workbookVideo = document.querySelector(".workbook__video") as HTMLDivElement;
const workbookPlayer = document.querySelector("#workbookPlayer") as HTMLVideoElement;

workbookPlay.addEventListener("click", () => {
	workbookVideo.classList.add("workbook__video-play");
	workbookPlay.classList.add("workbook__play--hidden");

	workbookPlayer.play();
	workbookPlayer.controls = true;
});

// Workbook Buy
const workbookBuys = document.querySelectorAll(".workbookOne") as NodeListOf<HTMLButtonElement>;
const workbookBtns = document.querySelectorAll(".workbook__btn") as NodeListOf<HTMLButtonElement>;
const workshopModal = document.querySelector("#workshopModal") as HTMLDivElement;
const closeWorkshopModal = document.querySelector("#closeWorkshopModal") as HTMLButtonElement;

const workshopModalForm = document.querySelector(".workshopModal__form") as HTMLFormElement;
const radioInputs = document.querySelectorAll(".workshopModal__radio--field") as NodeListOf<HTMLInputElement>;

const userEmail = document.querySelector("#userEmail") as HTMLInputElement;

const oneWorkshopInput = document.querySelector("#oneWorkshop") as HTMLInputElement;
const oneWorkshopTitle = document.querySelector("#oneWorkshopTitle") as HTMLSpanElement;

const allWorkshopInput = document.querySelector("#allWorkshop") as HTMLInputElement;
const allWorkshopTitle = document.querySelector("#allWorkshopTitle") as HTMLLabelElement;

const workshopModalPromo = document.querySelector("#workshopModalPromo") as HTMLDivElement;
const promoCodeInput = document.querySelector("#promoCode") as HTMLInputElement;
const applyPromoCodeButton = document.querySelector("#applyPromoCode") as HTMLButtonElement;
const workshopModalPromoSuccess = document.querySelector(
	"#workshopModalPromoSuccess",
) as HTMLParagraphElement;
const workshopModalPromoError = document.querySelector("#workshopModalPromoError") as HTMLParagraphElement;

const priceData = document.querySelector(".workshopModal__result--bold") as HTMLSpanElement;

const workshopModalSubmit = document.querySelector("#workshopModalSubmit") as HTMLButtonElement;
const workshopModalResult = document.querySelector(".workshopModal__message") as HTMLParagraphElement;

// Promo code
const promoCode = new URLSearchParams(location.search).get("code");

const WORKBOOK_SALE = 200;
const WORKBOOK_PRICE = 1200;
const ALL_WORKSHOPS_PRICE = 2000;

allWorkshopInput.value = "5, 1";
allWorkshopTitle.textContent = t("workshopModal.allWorkshopTitle");

for (const workbookBuy of workbookBuys) {
	workbookBuy.addEventListener("click", () => {
		oneWorkshopInput.checked = true;
		oneWorkshopInput.value = "1";

		oneWorkshopTitle.textContent = `Воркбук «Про Башку»`;
		priceData.textContent = "1200 ₴";

		workshopModalPromo.style.display = "flex";

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

		if (promoCode) {
			promoCodeInput.value = promoCode.toUpperCase();
			applyPromoCodeButton.click();
		}

		document.body.style.overflow = "hidden";
		workshopModal.classList.add("workshopModal--visible");
	});
}

for (const workbookBtn of workbookBtns) {
	workbookBtn.addEventListener("click", () => {
		allWorkshopInput.checked = true;
		allWorkshopInput.value = "5, 1";
		allWorkshopTitle.textContent = t("workshopModal.allWorkshopTitle");

		oneWorkshopTitle.textContent = `Воркбук «Про Башку»`;
		priceData.textContent = "2600 ₴";

		workshopModalPromo.style.display = "none";

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

		if (promoCode) {
			promoCodeInput.value = promoCode.toUpperCase();
		}

		document.body.style.overflow = "hidden";
		workshopModal.classList.add("workshopModal--visible");
	});
}

// Close workshop modal
workshopModal.addEventListener("click", (event) => {
	const target = event.target as HTMLElement;

	if (target.classList.contains("workshopModal") || target.classList.contains("modal__content")) {
		workshopModalForm.reset();
		document.body.style.overflow = "initial";
		workshopModal.classList.remove("workshopModal--visible");

		promoCodeInput.readOnly = false;
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
		applyPromoCodeButton.style.display = "block";
		workshopModalPromoError.style.display = "none";
		workshopModalPromoSuccess.style.display = "none";
	}
});

// Radio inputs
for (const radioInput of radioInputs) {
	radioInput.addEventListener("change", () => {
		if (radioInput.checked && radioInput.value === "5, 1") {
			workshopModalPromo.style.display = "none";

			promoCodeInput.value = "";
			promoCodeInput.readOnly = false;
			applyPromoCodeButton.style.display = "block";
			workshopModalPromoError.style.display = "none";
			workshopModalPromoSuccess.style.display = "none";

			priceData.textContent = getCurrency(WORKBOOK_PRICE / 2 + ALL_WORKSHOPS_PRICE);
		} else if (radioInput.checked) {
			if (promoCode) {
				promoCodeInput.value = promoCode.toUpperCase();
				applyPromoCodeButton.click();
				workshopModalPromo.style.display = "flex";
				return;
			}

			workshopModalPromo.style.display = "flex";
			priceData.textContent = getCurrency(WORKBOOK_PRICE);
		}
	});
}

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

workshopModalForm?.addEventListener("submit", async (event) => {
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
		const utmContent = new URLSearchParams(location.search).get("utmContent");

		const requestBody = {
			...(workshop === "5, 1"
				? {
						seminarIds: [5],
						workbookIds: [1],
					}
				: {
						workbookIds: [1],
					}),
			...(promoCode ? { promoCode } : {}),
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

			if (!response.ok) {
				throw new Error(`${t("errors.sendData")}`);
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

// Workbook details
const detailsContainers = document.querySelectorAll(".details__container");

for (const detailsContainer of detailsContainers) {
	const detailsButton = detailsContainer.querySelector(".details__button") as HTMLButtonElement;
	const detailsWrapper = detailsContainer.querySelector(".details__wrapper") as HTMLDivElement;

	if (detailsWrapper.classList.contains("details__wrapper--active")) {
		detailsWrapper.style.maxHeight = `${detailsWrapper.scrollHeight}px`;
	}

	detailsButton.addEventListener("click", () => {
		if (detailsContainer.classList.contains("details__container--active")) {
			detailsContainer.classList.remove("details__container--active");
			detailsWrapper.classList.remove("details__wrapper--active");
			detailsWrapper.style.maxHeight = "0px";
		} else {
			detailsContainer.classList.add("details__container--active");
			detailsWrapper.style.maxHeight = `${detailsWrapper.scrollHeight}px`;
		}
	});
}
