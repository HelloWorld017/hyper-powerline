export default (text, regexList) => {
	let finalMatch = null;

	if(regexList.length !== undefined) {
		regexList.forEach((v) => {
			const match = text.match(regexList[v]);
			if(match) finalMatch = match;
		});
	} else {
		finalMatch = text.match(regexList);
	}

	return finalMatch;
};
