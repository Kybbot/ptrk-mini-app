import { getLangFromUrl, useTranslations } from "../i18n/utils";

const lang = getLangFromUrl(location);
const t = useTranslations(lang);

const locationSearch = location.search;
const orderId = new URLSearchParams(locationSearch).get("orderId");

const loader = document.querySelector(".thankYou__loader") as HTMLDivElement;
const thankYouOk = document.querySelector(".thankYou__ok") as HTMLDivElement;
const thankYouError = document.querySelector(".thankYou__error") as HTMLDivElement;
const thankYouTitle = document.querySelector(".thankYou__title") as HTMLTitleElement;
const thankYouDescription = document.querySelector(".thankYou__description") as HTMLParagraphElement;
const thankYouEmail = document.querySelector(".thankYou__email") as HTMLParagraphElement;
const thankYouEmailBold = document.querySelector(".thankYou__email--bold") as HTMLSpanElement;
const thankYouLink = document.querySelector(".thankYou__link") as HTMLAnchorElement;

type SeminarType = {
	type: "seminar";
	image: string;
	description: string;
	record: boolean;
};

type WorkBookType = {
	type: "workBook";
	image: string;
	description: string;
};

type GroupTherapyType = {
	type: "groupTherapy";
	image: string;
	description: string;
};

type OrderReesponse = {
	status: "error" | "completed" | "draft" | null;
	email?: string;
	seminars: SeminarType[];
	workBooks: WorkBookType[];
	groupTherapy: GroupTherapyType[];
};

const createArticle = (value: SeminarType | WorkBookType | GroupTherapyType, isBundle = false) => {
	const article = document.createElement("article");
	article.classList.add("thankYou__card");

	// Image
	const pictureDiv = document.createElement("div");
	pictureDiv.classList.add("thankYou__picture");
	article.append(pictureDiv);

	const img = document.createElement("img");
	img.classList.add("thankYou__img");
	img.alt = "";
	img.width = 48;
	img.height = 48;
	img.ariaHidden = "true";
	img.src = value.image;
	img.srcset = value.image;
	pictureDiv.append(img);

	// Info
	const infoDiv = document.createElement("div");
	infoDiv.classList.add("thankYou__info");
	article.append(infoDiv);

	// Name
	const name = document.createElement("p");
	name.classList.add("thankYou__name");

	if (isBundle) {
		name.textContent = t("thankYou.bundle");
	} else {
		name.textContent = value.description;
	}

	infoDiv.append(name);

	// Description
	const about = document.createElement("p");
	about.classList.add("thankYou__about");

	if (value.type === "seminar") {
		about.textContent = value.record ? t("thankYou.seminarOld") : t("thankYou.seminarNew");

		if (isBundle) {
			about.textContent = value.record ? t("thankYou.seminarsOld") : t("thankYou.seminarNew");
		}
	}

	if (value.type === "workBook") {
		about.textContent = t("thankYou.workBook");
	}

	if (value.type === "groupTherapy") {
		about.textContent = t("thankYou.groupTherapy");
	}

	infoDiv.append(about);

	return article;
};

const getOrderData = async () => {
	const response = await fetch(
		`${import.meta.env.PUBLIC_API_URL}/orders/check?orderId=${orderId}&lang=${lang}`
	);

	if (!response.ok && response.status === 404) {
		throw new Error(t("thankYou.titleError1"));
	}

	if (!response.ok) {
		throw new Error(t("thankYou.titleError2"));
	}

	const data = (await response.json()) as OrderReesponse;

	if (data.status === "completed") {
		const arrOfArticles: HTMLElement[] = [];

		if (data.seminars.length === 4) {
			const article = createArticle(data.seminars[0], true);
			arrOfArticles.push(article);
		} else {
			for (const seminar of data.seminars) {
				const article = createArticle(seminar);
				arrOfArticles.push(article);
			}
		}

		for (const workbook of data.workBooks) {
			const article = createArticle(workbook);
			arrOfArticles.push(article);
		}

		for (const groupTherapy of data.groupTherapy) {
			const article = createArticle(groupTherapy);
			arrOfArticles.push(article);
		}

		if (data.email) {
			thankYouEmailBold.textContent = data.email;
		}

		loader.style.display = "none";
		thankYouOk.classList.add("thankYou__ok--active");
		thankYouTitle.classList.add("thankYou__title--active");
		thankYouEmail.classList.add("thankYou__email--active");
		thankYouLink.classList.add("thankYou__link--active");

		thankYouLink.before(...arrOfArticles);
	}

	if (data.status === "error" || data.status === "draft") {
		thankYouTitle.textContent = t("thankYou.titleError2");

		loader.style.display = "none";
		thankYouError.classList.add("thankYou__error--active");
		thankYouTitle.classList.add("thankYou__title--active");
		thankYouDescription.classList.add("thankYou__description--active");
	}
};

try {
	await getOrderData();
} catch (error) {
	if (error instanceof Error) {
		thankYouTitle.textContent = error.message;
		thankYouDescription.textContent = "";

		loader.style.display = "none";
		thankYouError.classList.add("thankYou__error--active");
		thankYouTitle.classList.add("thankYou__title--active");
	}
}
