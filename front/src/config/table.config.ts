export const TableConfig = {
	common: {
		fields: ['name', 'distance', 'moving_speed', 'date'],
		colNames: ['Название', 'Расстояние (км)', 'Ср. скорость в движении (км/ч)', 'Дата'],
		types: ['link', 'string', 'string', 'date']
	},
	extended: {
		fields: ['name', 'distance', 'moving_speed', 'elapsed_time', 'rest_time', 'date'],
		colNames: ['Название', 'Расстояние (км)', 'Ср. скрорость в движении (км/ч)', 'Время', 'Отдых', 'Дата'],
		types: ['link', 'string', 'string', 'time', 'time', 'date']
	},
	splits: {
		fields: ['index', 'distance', 'moving_speed', 'total_speed'],
		colNames: ['№ км п/п', 'Расстояние (км)', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)'],
		types: ['string', 'string', 'string', 'string']
	},
	segments: {
		fields: ['name', 'distance', 'moving_speed', 'total_speed', 'elapsed_time', 'rest_time'],
		colNames: ['Название', 'Расстояние (км)', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)', 'Время', 'Отдых'],
		types: ['string', 'string', 'string', 'string', 'time', 'time']
	},
	leaderboard: {
		fields: ['rank', 'athlete_name', 'moving_speed', 'total_speed', 'elapsed_time', 'rest_time'],
		colNames: ['Место', 'Имя', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)', 'Время', 'Отдых'],
		types: ['string', 'string', 'string', 'string', 'time', 'time']
	},
	myEfforts: {
		fields: ['date_display', 'moving_speed', 'total_speed', 'elapsed_time', 'rest_time'],
		colNames: ['Дата', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)', 'Время', 'Отдых'],
		types: ['link', 'string', 'string', 'time', 'time']
	}
};
