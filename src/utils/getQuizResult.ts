const getQuizResult = async (path: string) => {
	const url = import.meta.env.PUBLIC_API_URL;
	const response = await fetch(url + path);
	const { submit } = await response.json();
	return submit;
};

export default getQuizResult;
