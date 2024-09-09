export const getCountryByIP = async () => {
	try {
		const response = await fetch("https://ipapi.co/json/");
		const data = await response.json();
		return `${data.country_name}, ${data.region}, ${data.city}`;
	} catch (error) {
		return "unknown";
	}
};
