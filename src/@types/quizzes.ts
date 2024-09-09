type LocaleTextMap = {
	[locale: string]: string | undefined;
	en: string;
};

export type SubmitQuiz = {
	submit: {
		id: string;
		quizId: string;
		points: number;
		result: LocaleTextMap;
	};
};

export type SubmitQuiz2 = {
	submit: {
		id: string;
		quizId: string;
		points: number;
		result: number[];
	};
};

export type AnswerAndPointsType = {
	answer: {
		[lang: string]: string;
	};
	points: {
		text: {
			[lang: string]: string;
		};
		points: number;
	}[];
}[];
