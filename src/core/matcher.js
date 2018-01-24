export function terminalMatcher (text, regexList) {
	let finalMatch = null;

	if(regexList.length !== undefined) {
		regexList.forEach((v) => {
			const match = text.match(v);
			if(match) finalMatch = [match, v];
		});
	} else {
		finalMatch = text.match(regexList);
	}

	return [finalMatch, v];
};
