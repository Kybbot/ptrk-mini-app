export const getDate = (value: string, useMonthName = true, lang: "ru" | "ua" | "en" = "ru") => {
	const date = new Date(value);
	const months = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
	const monthsUa = ["Січ", "Лют", "Бер", "Квіт", "Трав", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Груд"];

	const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
	const month = date.getMonth();
	const year = date.getFullYear();

	return useMonthName
		? `${day} ${lang === "ru" ? months[month] : monthsUa[month]} ${year}`
		: `${day}.${month < 10 ? `0${month + 1}` : month + 1}.${year}`;
};
