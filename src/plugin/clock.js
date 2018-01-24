module.exports = async () => {
	const date = new Date();
	const pad2 = (num) => num < 10 ? `0${num}` : `${num}`;

	return `\uF017 ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};
