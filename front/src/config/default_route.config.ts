function getDefaultRoute () {
	var date = new Date,
		month = date.getMonth() + 1,
		state = 'ski';

	if (month >= 4 && month < 12) {
		state = 'run';
	}

	return state;
}

export const DefaultRouteCongif = {
	route: getDefaultRoute()
};
