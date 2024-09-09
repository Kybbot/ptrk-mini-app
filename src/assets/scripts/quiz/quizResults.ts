import Swiper from "swiper";
import { FreeMode } from "swiper/modules";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

const lang = getLangFromUrl(location);
const t = useTranslations(lang);

new Swiper("#quiResultSwiper", {
	slidesPerView: "auto",
	spaceBetween: 8,
	freeMode: true,
	modules: [FreeMode],
});

const quiResultLink = document.querySelector(".quiResult__link") as HTMLButtonElement;

const copyToClipBoard = async (url: string) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
		await navigator.clipboard.writeText(url);
		quiResultLink.dataset.title = t("quiz.copy");
	} else {
		quiResultLink.dataset.title = t("quiz.copyError");
	}
	quiResultLink.classList.add("quiResult__link--active");

	setTimeout(() => {
		quiResultLink.classList.remove("quiResult__link--active");
	}, 2000);
};

const shareHandler = async () => {
	const shareData = {
		title: t("quiz.copyTitle"),
		url: window.location.href,
	};

	if (navigator.canShare) {
		if (navigator.canShare(shareData)) {
			try {
				await navigator.share(shareData);
			} catch (error) {
				console.log(error);
			}
		} else {
			await copyToClipBoard(shareData.url);
		}
	} else {
		await copyToClipBoard(shareData.url);
	}
};

quiResultLink?.addEventListener("click", shareHandler);

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
