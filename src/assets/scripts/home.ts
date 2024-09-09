import Swiper from "swiper";
import { FreeMode } from "swiper/modules";

new Swiper("#homeSwiper", {
	slidesPerView: "auto",
	spaceBetween: 8,
	freeMode: true,
	modules: [FreeMode],
});
