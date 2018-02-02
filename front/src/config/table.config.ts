export const TableConfig = {
	common: {
		fields: ['name', 'distance', 'moving_speed', 'date'],
		colNames: ['Название', 'Расстояние (км)', 'Ср. скорость в движении (км/ч)', 'Дата']
	},
	extended: {
		fields: ['name', 'distance', 'moving_speed', 'elapsed_time', 'rest_time', 'date'],
		colNames: ['Название', 'Расстояние (км)', 'Ср. скрорость в движении (км/ч)', 'Время', 'Отдых', 'Дата']
	},
	splits: {
		fields: ['index', 'distance', 'moving_speed', 'total_speed'],
		colNames: ['№ км п/п', 'Расстояние (км)', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)']
	},
	segments: {
		fields: ['name', 'distance', 'moving_speed', 'total_speed', 'elapsed_time', 'rest_time'],
		colNames: ['Название', 'Расстояние (км)', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)', 'Время', 'Отдых']
	},
	leaderboard: {
		fields: ['rank', 'athlete_name', 'moving_speed', 'total_speed', 'elapsed_time', 'rest_time'],
		colNames: ['Место', 'Имя', 'Скрорость в движении (км/ч)', 'Общая скорость (км/ч)', 'Время', 'Отдых']
	}
};
