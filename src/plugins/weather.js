const axios = require('axios');

const LOCATION = 'KSXX0027';
const SERVER = `http://wxdata.weather.com/wxdata/weather/local/${LOCATION}?cc=*&unit=m&dayf=0`;

const parseTag = response => tag => {
	const match = response.match(new RegExp(`<${tag}>(.*)</${tag}>`));
	if(!match) return "";

	return ` ${match[1]}`;
};

module.exports = async () => {
	const temp = await axios.get(SERVER);
	const get = parseTag(temp.data);
	return "\uF2CA Daejeon" + get('tmp') + get('t');
};
