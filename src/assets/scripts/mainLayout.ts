if (window.Telegram) {
	window.Telegram.WebApp.expand();
	window.Telegram.WebApp.disableVerticalSwipes();
}

// Referral Code
const referralCode = new URLSearchParams(location.search).get("referralCode");

if (referralCode) {
	localStorage.setItem("referralCode", referralCode);
}

// Change Language
const mobileMenuLngs = document.querySelectorAll(".mobileMenu__lng") as NodeListOf<HTMLButtonElement>;

for (const mobileMenuLng of mobileMenuLngs) {
	mobileMenuLng.addEventListener("click", (event) => {
		const target = event.target as HTMLButtonElement;
		const value = target.dataset.value;

		if (value) {
			document.cookie = `locale=${value};max-age=${60 * 60 * 24 * 365}`;
			window.location.pathname = value;
		}
	});
}

const pathname = location.pathname;
const updatedPathname =
	pathname.length > 4 && pathname[pathname.length - 1] === "/" ? pathname.slice(0, -1) : pathname;

// THERAPY MODAL
const therapyBtns = document.querySelectorAll(".therapyBtn") as NodeListOf<HTMLButtonElement>;

for (const therapyBtn of therapyBtns) {
	therapyBtn.addEventListener("click", () => {
		if (window.Telegram) {
			window.Telegram.WebApp.openTelegramLink("https://t.me/ptrkptrk");
		}
	});
}

// FOOTER
const footerDetails = document.querySelector(".footer__details") as HTMLDivElement;

const detailsButton = footerDetails.querySelector(".footer__btn") as HTMLButtonElement;
const detailsContent = footerDetails.querySelector(".footer__content") as HTMLDivElement;

if (detailsContent.classList.contains("footer__content--active")) {
	detailsContent.style.maxHeight = `${detailsContent.scrollHeight}px`;
}

detailsButton.addEventListener("click", () => {
	if (footerDetails.classList.contains("footer__details--active")) {
		footerDetails.classList.remove("footer__details--active");
		detailsContent.classList.remove("footer__content--active");
		detailsContent.style.maxHeight = "0px";
	} else {
		footerDetails.classList.add("footer__details--active");
		detailsContent.style.maxHeight = `${detailsContent.scrollHeight}px`;
		setTimeout(() => {
			window.scrollTo({
				left: 0,
				behavior: "smooth",
				top: document.body.scrollHeight,
			});
		}, 210);
	}
});
