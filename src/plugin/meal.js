const calcium = require('calcium');
const promisify = require('pify');

module.exports = async () => {
	const SCHOOL_ID = 'G100000167';

	const date = new Date();
	const meals = await promisify(calcium.get)(SCHOOL_ID, date.getFullYear(), date.getMonth());
	const meal = meals[date.getDate()];

	if(meal) {
		if(date.getHours() < 13 && meal.lunch) {
			return "\uF0F5 " + meal.lunch.join(' | ');
		} else if(date.getHours() < 19 && meal.dinner) {
			return "\uF0F5 " + meal.dinner.join(' | ');
		}
	}

	return null;
};
