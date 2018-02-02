import { Pipe, PipeTransform } from '@angular/core';
import { _ } from 'lodash';

@Pipe({name: 'fieldFormatter'})

export class FieldFormatterPipe implements PipeTransform {
	transform(val: any, element: any, field: string): string {
		var type = field.indexOf('time') >= 0 ? 'time' : (field.indexOf('date') >= 0 ? 'date' : 'string'),
			actions = {
				time: function (time) {
					var hours = Math.floor(time / 60 / 60),
						timeUnits = ['ч', 'мин', 'с'],
						mins = Math.floor(time / 60) - hours * 60,
						secs = time % 60,
						timeArr = [hours, mins, secs],
						resArr = [],
						res;

					if (time !== 0) {
						timeArr.forEach((el, i) => {
							if (el !== 0) {
								resArr.push(el + '<span class="time">' + timeUnits[i] + '</span>');
							}
						});
						res = resArr.join(' ');
					} else {
						res = '-';
					}

					return res;
				},
				string: function (str) {
					return str;
				},
				date: function () {
					return element['date_display'];
				}
			};

		return actions[type](val);
	}
}
