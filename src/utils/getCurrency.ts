export const getCurrency = (value: number, type: "ua" | "eu" = "ua") => {
	return new Intl.NumberFormat(type === "ua" ? "uk-UA" : "de-DE", {
		style: "currency",
		currency: type === "ua" ? "UAH" : "EUR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		currencyDisplay: "narrowSymbol",
	}).format(value);
};
