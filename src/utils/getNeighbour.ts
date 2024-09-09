const getNeighbour = async (slug: string) => {
	const url = 'https://api.ptrk.fm';
	try {
		const response = await fetch(`${url}/articles/neighbor/${slug}`);
		const { data } = await response.json();
		return data;
	} catch (e) {
		return {
			previous_article: undefined,
			next_article: undefined,
		};
	}
};

export default getNeighbour;
