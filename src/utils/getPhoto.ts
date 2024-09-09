export default (url: string) => {
	return url ? 'https://api.ptrk.fm' + '/img/' + url : null;
};
