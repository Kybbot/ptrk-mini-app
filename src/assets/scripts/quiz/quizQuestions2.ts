import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { SubmitQuiz } from "@/@types/quizzes";

const lang = getLangFromUrl(location);
const locale = lang === "ru" ? "/" : "/ua/";
const t = useTranslations(lang);

document.addEventListener("DOMContentLoaded", async () => {
	const dashboardEmail = localStorage.getItem("dashboardEmail");
	const userEmailInput = document.querySelector("#userEmail") as HTMLInputElement;

	if (dashboardEmail) {
		userEmailInput.value = dashboardEmail;
	}

	const quizError = document.querySelector("#quizError") as HTMLParagraphElement;

	// QUIZ ID
	const quizTitel = document.querySelector(".quiz__titel") as HTMLHeadingElement;
	const quizId = quizTitel.id;
	const quizLink = quizTitel.dataset.quizlink;

	// QUIZ PROGRESS
	const amountOfQuestions = document.querySelectorAll(".quiz__fieldset").length;
	const amountOfQuestionsWithoutEmail = document.querySelectorAll(".quiz__fieldset").length - 1;
	const quizBars = document.querySelectorAll(".quiz__bar");
	const answerCount = document.getElementById("answered");

	let quizPosition = 1;

	function updateProgressBar() {
		const activeQuizBars = Array.from(quizBars).slice(0, quizPosition);

		for (const quizBar of quizBars) {
			quizBar.classList.remove("quiz__bar--active");
		}

		for (const quizBar of activeQuizBars) {
			quizBar.classList.add("quiz__bar--active");
		}

		const answerCountText = `${
			quizPosition === amountOfQuestions ? amountOfQuestionsWithoutEmail : quizPosition
		}/${amountOfQuestionsWithoutEmail}`;
		if (answerCount) answerCount.textContent = answerCountText;
	}

	updateProgressBar();

	// FORM
	const quizQuestions = document.querySelector(".quiz__questions") as HTMLDivElement;
	const quizFooter = document.querySelector("#quizFooter") as HTMLDivElement;
	const backButton = document.querySelector("#backButton") as HTMLButtonElement;
	const nextButton = document.querySelector("#nextButton") as HTMLButtonElement;
	const skipButton = document.querySelector("#skipButton") as HTMLButtonElement;
	const submitButton = document.querySelector("#submitButton") as HTMLButtonElement;
	const allQuestionWrappers = document.querySelectorAll(".quiz__fieldset") as NodeListOf<HTMLFieldSetElement>;

	backButton.addEventListener("click", () => {
		quizError.classList.remove("quiz__error--show");

		const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap

		quizPosition = quizPosition - 1;

		quizQuestions.scrollTo({
			top: 0,
			left: (quizPosition - 1) * quizQuestionsWidth,
			behavior: "smooth",
		});

		nextButton.classList.add("quiz__next--active");

		if (quizPosition === 1) {
			backButton.classList.remove("quiz__back--active");
		}

		if (quizFooter.classList.contains("quiz__footer--hide")) {
			quizFooter.classList.remove("quiz__footer--hide");
		}

		updateProgressBar();
	});

	nextButton.addEventListener("click", () => {
		quizError.classList.remove("quiz__error--show");

		const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap

		quizQuestions.scrollTo({
			top: 0,
			left: quizPosition * quizQuestionsWidth,
			behavior: "smooth",
		});

		if (
			allQuestionWrappers[quizPosition].dataset.submitted === "true" &&
			quizPosition !== amountOfQuestions
		) {
			nextButton.classList.add("quiz__next--active");
		} else {
			nextButton.classList.remove("quiz__next--active");
		}

		if (quizPosition >= 1) {
			backButton.classList.add("quiz__back--active");
		}

		if (quizPosition + 1 <= amountOfQuestions) {
			quizPosition = quizPosition + 1;
		}

		if (quizPosition === amountOfQuestions) {
			quizFooter.classList.add("quiz__footer--hide");
			nextButton.classList.remove("quiz__next--active");
		}

		updateProgressBar();
	});

	window.addEventListener("resize", () => {
		const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap
		quizQuestions.scrollTo({
			top: 0,
			left: (quizPosition - 1) * quizQuestionsWidth,
			behavior: "smooth",
		});
	});

	const handleSelect = (event: Event, select: HTMLSelectElement, allQuestionWrapper: HTMLFieldSetElement) => {
		const target = event.target as HTMLSelectElement;

		if (target.value !== "0") {
			target.classList.add("select--active");
		}

		if (select.value !== "0" && target.value !== "0" && allQuestionWrapper.dataset.submitted !== "true") {
			const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap

			quizQuestions.scrollTo({
				top: 0,
				left: quizPosition * quizQuestionsWidth,
				behavior: "smooth",
			});

			allQuestionWrapper.dataset.submitted = "true";

			nextButton.classList.remove("quiz__next--active");

			if (quizPosition + 1 <= amountOfQuestions) {
				quizPosition = quizPosition + 1;
			}

			if (quizPosition >= 1) {
				backButton.classList.add("quiz__back--active");
			}

			if (quizPosition === amountOfQuestions) {
				quizFooter.classList.add("quiz__footer--hide");
			}

			updateProgressBar();
		}
	};

	for (const allQuestionWrapper of allQuestionWrappers) {
		const firstSelect = allQuestionWrapper.querySelectorAll(".select")[0] as HTMLSelectElement | undefined;
		const secondSelect = allQuestionWrapper.querySelectorAll(".select")[1] as HTMLSelectElement | undefined;

		if (firstSelect && secondSelect) {
			firstSelect.addEventListener("change", (event) => {
				handleSelect(event, secondSelect, allQuestionWrapper);
			});

			secondSelect.addEventListener("change", (event) => {
				handleSelect(event, firstSelect, allQuestionWrapper);
			});
		}
	}

	// SUBMIT
	const quizForm = document.getElementById("quizForm") as HTMLFormElement;

	const isAnyMainContainerNotAnswered = () => {
		const answeredQuestions = document.querySelectorAll('.quiz__fieldset[data-submitted="true"]').length;
		return answeredQuestions < amountOfQuestionsWithoutEmail;
	};

	const getSubmittedQuiz = async () => {
		const data = new FormData(quizForm);
		const dataArray = Array.from(data.values()).slice(0, -1); // Minus email
		const finalData: { [key: number]: number[] } = {};

		let currentNumber = 1;
		for (let i = 0; i < dataArray.length; i += 2) {
			finalData[currentNumber] = [+dataArray[i], +dataArray[i + 1]];
			currentNumber += 1;
		}

		const userEmailInputValue = userEmailInput.value;
		const userEmail = userEmailInputValue || "";

		try {
			const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/quiz/submit/precalculated`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					quizId: quizId,
					points: finalData,
					email: userEmail,
				}),
			});

			if (!response.ok) {
				throw new Error(t("quiz.error2"));
			}

			const { submit } = (await response.json()) as SubmitQuiz;
			return window.location.replace(`${locale}${quizLink}/${submit.id}`);
		} catch (error) {
			if (error instanceof Error) {
				quizError.textContent = error.message;
				quizError.classList.add("quiz__error--show");
			}
		} finally {
			skipButton.disabled = false;
			submitButton.disabled = false;
		}
	};

	quizForm.addEventListener("submit", (event) => {
		event.preventDefault();
		skipButton.disabled = true;
		submitButton.disabled = true;
		quizError.classList.remove("quiz__error--show");

		if (isAnyMainContainerNotAnswered()) {
			backButton.click();
			quizError.textContent = t("quiz.error1");
			quizError.classList.add("quiz__error--show");
			skipButton.disabled = false;
			submitButton.disabled = false;
		} else {
			getSubmittedQuiz();
		}
	});

	skipButton.addEventListener("click", () => {
		userEmailInput.required = false;
		quizForm.requestSubmit();
	});
});
