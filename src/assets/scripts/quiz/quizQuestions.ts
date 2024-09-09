import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { type SubmitQuiz } from "@/@types/quizzes";

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

	// INPUTS
	const quizQuestions = document.querySelector(".quiz__questions") as HTMLDivElement;
	const answerContainers = document.querySelectorAll(".quiz__label");
	const quizFooter = document.querySelector("#quizFooter") as HTMLDivElement;
	const backButton = document.querySelector("#backButton") as HTMLButtonElement;
	const skipButton = document.querySelector("#skipButton") as HTMLButtonElement;
	const submitButton = document.querySelector("#submitButton") as HTMLButtonElement;

	let totalResult: number;

	const handleAnswerClick = (value: string) => {
		answerContainers.forEach((container) => {
			const radioInput = container.querySelector('input[type="radio"]') as HTMLInputElement;
			const isChecked = radioInput.checked;

			if (isChecked) {
				container.classList.add("quiz__label--active");
			} else {
				container.classList.remove("quiz__label--active");
			}
		});

		const counter = document.getElementById("counter") as HTMLDivElement;
		const firstBracket = counter.className.indexOf("[");
		const lastBracket = counter.className.indexOf("]");

		if (lastBracket === undefined || firstBracket === undefined) return;

		let counterClassName = counter.className.substring(firstBracket, lastBracket + 1);

		if (!counterClassName) return;

		let result = JSON.parse(counterClassName);
		let answerData = value.split("-");

		while (Number(answerData[0]) > result.length - 1) {
			result.push(0);
		}

		result[Number(answerData[0])] = Number(answerData[1]);

		counter.classList.remove(counterClassName);
		counter.classList.add(JSON.stringify(result));

		return result.reduce((a: number, b: number) => a + b, 0);
	};

	backButton.addEventListener("click", () => {
		quizError.classList.remove("quiz__error--show");

		const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap

		quizPosition = quizPosition - 1;

		quizQuestions.scrollTo({
			top: 0,
			left: (quizPosition - 1) * quizQuestionsWidth,
			behavior: "smooth",
		});

		if (quizPosition === 1) {
			backButton.classList.remove("quiz__back--active");
		}

		if (quizFooter.classList.contains("quiz__footer--hide")) {
			quizFooter.classList.remove("quiz__footer--hide");
		}

		updateProgressBar();
	});

	answerContainers.forEach((container) => {
		const radioInput = container.querySelector('input[type="radio"]') as HTMLInputElement;

		radioInput.addEventListener("click", () => {
			quizError.classList.remove("quiz__error--show");

			totalResult = handleAnswerClick(radioInput.value);

			const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap

			quizQuestions.scrollTo({
				top: 0,
				left: quizPosition * quizQuestionsWidth,
				behavior: "smooth",
			});

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
		});
	});

	window.addEventListener("resize", () => {
		const quizQuestionsWidth = quizQuestions.getBoundingClientRect().width + 10; // Width of quiz__questions div + 10px gap
		quizQuestions.scrollTo({
			top: 0,
			left: (quizPosition - 1) * quizQuestionsWidth,
			behavior: "smooth",
		});
	});

	// SUBMIT
	const quizForm = document.getElementById("quizForm") as HTMLFormElement;

	const isAnyMainContainerNotAnswered = () => {
		const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
		return answeredQuestions < amountOfQuestionsWithoutEmail;
	};

	const getSubmittedQuiz = async () => {
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
					points: totalResult,
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
