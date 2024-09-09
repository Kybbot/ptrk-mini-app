type LocaleTextMap = {
	[locale: string]: string | undefined;
	en: string;
};

export type DashboardQuiz = {
	date: string;
	points: number;
	maxPoints: number;
	testNumber: number;
	urls: LocaleTextMap;
	title: LocaleTextMap;
	result: LocaleTextMap | number[];
};

export type DashboardQuizzesResponse = {
	data: DashboardQuiz[];
	numberOfTests: number;
	numberOfPages: number;
	nextPage: number | null;
};
