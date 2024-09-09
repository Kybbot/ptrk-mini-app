const fetchHandler = async (path: string, options?: RequestInit) => {
	const url = 'https://api.ptrk.fm';
	const response = await fetch(url + path, options);
	const { data } = await response.json();
	return data;
};

export default fetchHandler;
