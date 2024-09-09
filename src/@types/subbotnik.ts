export type SubbotnikResponse = {
	id: number;
	name: string;
	time: string;
	duration: string;
	date: string;
	nextWeek: boolean;
	numberOfSeats: number;
	reservedSeatsCount: number;
	price: number;
	image: string;
	image2x: string;
}[];
