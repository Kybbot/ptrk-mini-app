import Swiper from "swiper";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

const prevBtn = document.querySelector("#prevBtn") as HTMLButtonElement;
const nextBtn = document.querySelector("#nextBtn") as HTMLButtonElement;
const progressBar = document.querySelector("#progressBar") as HTMLSpanElement;

const swiper = new Swiper("#therapySlider", {
	slidesPerView: 1,
	spaceBetween: 16,
	freeMode: true,
	modules: [FreeMode, Pagination, Navigation],
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: "auto",
		},
	},
});

prevBtn.addEventListener("click", () => {
	swiper.slidePrev();
});

nextBtn.addEventListener("click", () => {
	swiper.slideNext();
});

swiper.on("afterInit", () => {
	const slidesLength = swiper.slides.length;

	progressBar.style.width = `${100 / slidesLength}%`;
});

swiper.on("slideChange", () => {
	const progress = swiper.progress;
	const activeIndex = swiper.activeIndex;
	const slidesLength = swiper.slides.length;

	const progressBarWidth = (100 / slidesLength) * (activeIndex + 1);

	progressBar.style.width = `${progressBarWidth.toFixed(2)}%`;

	if (progress <= 0) {
		progressBar.style.width = `${100 / slidesLength}%`;
	}

	if (progress >= 1) {
		progressBar.style.width = `100%`;
	}
});
