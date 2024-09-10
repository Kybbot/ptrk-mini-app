if (window.Telegram) {
	window.Telegram.WebApp.expand();
	window.Telegram.WebApp.disableVerticalSwipes();
}

// Referral Code
const referralCode = new URLSearchParams(location.search).get("referralCode");

if (referralCode) {
	localStorage.setItem("referralCode", referralCode);
}

// BTNS
const linkBtns = document.querySelectorAll(".linkBtn") as NodeListOf<HTMLButtonElement>;
const tgLinkBtns = document.querySelectorAll(".tgLinkBtn") as NodeListOf<HTMLButtonElement>;

for (const linkBtn of linkBtns) {
	linkBtn.addEventListener("click", () => {
		const href = linkBtn.dataset.href!;

		if (window.Telegram) {
			window.Telegram.WebApp.openLink(href, { try_instant_view: true });
		}
	});
}

for (const tgLinkBtn of tgLinkBtns) {
	tgLinkBtn.addEventListener("click", () => {
		const href = tgLinkBtn.dataset.href!;

		if (window.Telegram) {
			window.Telegram.WebApp.openTelegramLink(href);
		}
	});
}

// THERAPY BTNS
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
