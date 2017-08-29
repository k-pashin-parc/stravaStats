export const TableConfig = {
	common: {
		fields: ['name', 'distance', 'moving_speed', 'date'],
		colNames: ['Название', 'Расстояние (км)', 'Ср. скорость в движении (км/ч)', 'Дата']
	},
	extended: {
		fields: ['name', 'distance', 'elapsed_time', 'moving_speed', 'total_speed', 'date'],
		colNames: ['Название', 'Расстояние (км)', 'Времения потрачено (ч)', 'Ср. скрорость в движении (км/ч)', 'Общая скорость (км/ч)', 'Дата'],
	}
};
