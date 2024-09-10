import { type Workshop } from "@/@types/workshops";

export const workshops: Workshop[] = [
	{
		id: 1,
		title: {
			ru: "Самооценка",
			ua: "Самооцінка",
		},
		description: {
			ru: "Останавливаемся унижаться в своих же глазах, начинаем любить себя, меняем самооценку на самоценность и становимся нормальными Джеки Чанами",
			ua: "Зупиняємося принижуватися у своїх же очах, починаємо любити себе, змінюємо самооцінку на самоцінність і стаємо нормальними Джекі Чанами",
		},
		imageSrc: "/images/workshops/1d.jpg",
		imageSrcSet: "/images/workshops/1d@2x.jpg 2x",
		date: "2024-05-04",
		start: "18:00",
		timing: "2",
		priceUAH: "699 ₴",
		record: true,
	},
	{
		id: 2,
		title: {
			ru: "Травмы",
			ua: "Травми",
		},
		description: {
			ru: "Травмируем травмы без дыхания маткой. Отстаем от родителей и живем припеваючи",
			ua: "Травмуємо травми без дихання маткою. Відстаємо від батьків і живемо приспівуючи",
		},
		imageSrc: "/images/workshops/2d.jpg",
		imageSrcSet: "/images/workshops/2d@2x.jpg 2x",
		date: "2024-05-11",
		start: "18:00",
		timing: "2",
		priceUAH: "699 ₴",
		record: true,
	},
	{
		id: 3,
		title: {
			ru: "Отношения",
			ua: "Стосунки",
		},
		description: {
			ru: "Как жить, если я не хочу быть в отношениях и как находясь в отношениях жить не тужить?",
			ua: "Як жити, якщо я не хочу бути у стосунках і як перебуваючи у стосунках жити не тужити?",
		},
		imageSrc: "/images/workshops/3d.jpg",
		imageSrcSet: "/images/workshops/3d@2x.jpg 2x",
		date: "2024-05-18",
		start: "18:00",
		timing: "2",
		priceUAH: "699 ₴",
		record: true,
	},
	{
		id: 4,
		title: {
			ru: "Карьера",
			ua: "Кар'єра",
		},
		description: {
			ru: `${new Date().getFullYear()} пора выходить из фин.абьюза и зарабатывать бабки, это уже можно даже девочкам. Как найти себя и не бояться работать?`,
			ua: "2024 пора виходити з фін.аб'юзу і заробляти бабки, це вже можна навіть дівчаткам. Як знайти себе і не боятися працювати?",
		},
		imageSrc: "/images/workshops/4d.jpg",
		imageSrcSet: "/images/workshops/4d@2x.jpg 2x",
		date: "2024-05-25",
		start: "18:00",
		timing: "2",
		priceUAH: "699 ₴",
		record: true,
	},
] as const;
