type LocaleText = {
	[locale: string]: string;
};

export interface Workshop {
	id: number;
	title: LocaleText;
	description: LocaleText;
	imageSrc: string;
	imageSrcSet: string;
	date: string;
	start: string;
	timing: string;
	priceUAH: string;
	record: boolean;
}
export interface Workbook {
	id: number;
	title: LocaleText;
	description: LocaleText;
	imageSrc: string;
	imageSrcSet: string;
	priceUAH: string;
}

export type SeminarsType = {
	id: number;
	date: string;
	name: LocaleText;
	record: boolean;
	preview: string;
	linkToRecordedSeminar: string;
	videoDurationFormatted: string;
};

export type WorkbooksType = {
	id: number;
	date: string;
	name: string;
	image: string;
	linkToEmptyFileUa: string;
	linkToFilledFileUa: string;
	linkToEmptyFileRu: string;
	linkToFilledFileRu: string;
	preview: string;
	videoName: LocaleText;
	recordedVideoId: string;
	videoDurationFormatted: string;
};

export type GroupTherapyType = {
	id: number;
	date: string;
	lectures: {
		name: {
			ua: string;
			ru: string;
		};
		recordedVideoId: string;
		videoDurationFormatted: string;
		date: string;
	}[];
};

export type DashboardDataResponse = {
	seminars: SeminarsType[];
	workbooks: WorkbooksType[];
	groupTherapy: GroupTherapyType[];
};
