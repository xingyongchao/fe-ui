export function appendSearchParam(url, params) {
	if (!params) {
		return url;
	}
	if (url) {
		const urlObj = new URL(url);
		Object.keys(params).forEach((name) => {
			urlObj.searchParams.set(name, params[name]);
		});
		return urlObj.toString();
	}
	return url;
}
