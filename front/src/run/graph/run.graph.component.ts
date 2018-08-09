import { HostBinding, Component, OnInit } from '@angular/core';

import { forEach } from 'lodash';
import { find } from 'lodash';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'run-graph',
	templateUrl: './run.graph.html',
	animations: [routeAnimation]
})

@CommonUnsubscribe
export class RunGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	private activities: Object[];
	private ridesAmountParams: Object;
	private totalDistanceParams: Object;
	private spentParams: Object;
	private request: Object;
	private getByMonthsParams;

	private seasonsParams = {
		values: [],
		selectedSeasonId: null
	};

	constructor(private activitiesService: ActivitiesService) {}

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any) => {
				const data = res.Run,
					seasons = data.seasons;

				this.ridesAmountParams = {
					data: seasons,
					fields: ['ridesAmount'],
					names: ['Кол-во забегов']
				};

				this.totalDistanceParams = {
					data: seasons,
					fields: ['totalDistance', 'movingSpeed'],
					names: ['Общий пробег (км)', 'Скорость в движении (км/ч)']
				};

				this.spentParams = {
					data: seasons,
					fields: ['elapsedTime'],
					names: ['Времени потрачено (ч)']
				};

				data.seasons.forEach((el, i) => {
					this.seasonsParams.values.unshift({
						Id: el.id,
						Name: el.title
					});
				});

				this.seasonsParams.selectedSeasonId = this.seasonsParams.values[0].Id;

				this.activities = data;
			});

		this.getByMonthsParams = () => {
			return {
				data: find(this.activities['seasons'], {id: this.seasonsParams.selectedSeasonId}).distanceByMonths,
				fields: ['value'],
				names: ['Пробег по месяцам, км']
			};
		};
	}
}
