import { Pipe, PipeTransform } from '@angular/core';
import { _ } from 'lodash';

@Pipe({name: 'fieldFormatter'})

export class FieldFormatterPipe implements PipeTransform {
	transform(val: any, element: any, type): string {
		const actions = {
				time: function (time) {
					let hours = Math.floor(time / 60 / 60),
						timeUnits = ['ч', 'мин', 'с'],
						mins = Math.floor(time / 60) - hours * 60,
						secs = time % 60,
						timeArr = [hours, mins, secs],
						resArr = [],
						res;

					if (time !== 0) {
						timeArr.forEach((el, i) => {
							if (el !== 0) {
								resArr.push(`${el} <span class='time'> ${timeUnits[i]} </span>`);
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
				},
				link: function (str) {
					return `<a class='link name' href='https://www.strava.com/activities/${element.id}' target='_blank'>${str}</a>`;
				}
			};

		return actions[type](val);
	}
}
