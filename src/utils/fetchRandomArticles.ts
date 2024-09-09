const fetchRandomArticles = async (slug: string, limit: number) => {
	const url = 'https://api.ptrk.fm';
	const response = await fetch(
		`${url}/articles/shuffle?limit=${limit}&except=${slug}`
	);
	const { data } = await response.json();
	return data;
};

export default fetchRandomArticles;
