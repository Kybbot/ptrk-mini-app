import { type FC, useRef } from "react";
import { useSwiper } from "swiper/react";

type SwiperNavigationProps = {
	workshopsCount: number;
};

export const SwiperNavigation: FC<SwiperNavigationProps> = ({ workshopsCount }) => {
	const swiper = useSwiper();

	const progressBarRef = useRef<HTMLSpanElement>(null);

	swiper.on("afterInit", () => {
		if (progressBarRef.current) {
			progressBarRef.current.style.width = `${100 / workshopsCount}%`;
		}
	});

	swiper.on("slideChange", () => {
		const progress = swiper.progress;
		const activeIndex = swiper.activeIndex;

		const progressBarWidth = (100 / workshopsCount) * (activeIndex + 1);

		if (progressBarRef.current) {
			progressBarRef.current.style.width = `${progressBarWidth.toFixed(2)}%`;

			if (progress <= 0) {
				progressBarRef.current.style.width = `${100 / workshopsCount}%`;
			}

			if (progress >= 1) {
				progressBarRef.current.style.width = `100%`;
			}
		}
	});

	return (
		<div className="swiperNavigation">
			<button
				id="prevBtn"
				type="button"
				aria-label="Назад"
				className="servicesSlider__btn"
				onClick={() => swiper.slidePrev()}
			>
				<svg
					width="40"
					height="40"
					fill="none"
					aria-hidden="true"
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						width="40"
						height="40"
						rx="20"
						transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)"
						fill="white"
					></rect>
					<rect
						x="0.5"
						y="0.5"
						width="39"
						height="39"
						rx="19.5"
						transform="matrix(-4.37114e-08 1 1 4.37114e-08 -2.18557e-08 2.18557e-08)"
						stroke="black"
						strokeOpacity="0.08"
					></rect>
					<path
						d="M22.5 25L17.5 20L22.5 15"
						stroke="#AEAEAE"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>
			</button>
			<div className="servicesSlider__progress">
				<span ref={progressBarRef} className="servicesSlider__bar"></span>
			</div>
			<button
				id="nextBtn"
				type="button"
				aria-label="Вперёд"
				className="servicesSlider__btn"
				onClick={() => swiper.slideNext()}
			>
				<svg
					width="40"
					height="40"
					fill="none"
					aria-hidden="true"
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="40" width="40" height="40" rx="20" transform="rotate(90 40 0)" fill="white"></rect>
					<rect
						x="39.5"
						y="0.5"
						width="39"
						height="39"
						rx="19.5"
						transform="rotate(90 39.5 0.5)"
						stroke="black"
						strokeOpacity="0.08"
					></rect>
					<path
						d="M17.5 25L22.5 20L17.5 15"
						stroke="#AEAEAE"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>
			</button>
		</div>
	);
};
