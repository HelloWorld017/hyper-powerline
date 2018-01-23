const axios = require('axios');

module.exports = async () => {
	const temp = await axios.get('http://hangang.dkserver.wo.tc/');
	return "\uF2CA Hangang " + temp.data.temp;
};
