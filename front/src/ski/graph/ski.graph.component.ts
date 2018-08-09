import { HostBinding, Component, OnInit } from '@angular/core';

import { forEach } from 'lodash';
import { find } from 'lodash';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'ski-graph',
	templateUrl: './ski.graph.html',
	animations: [routeAnimation]
})

@CommonUnsubscribe
export class SkiGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	private activities: Object[];
	private ridesAmountParams: Object;
	private speedParams: Object;
	private detailSpeedParams: Object;
	private totalDistanceParams: Object;
	private spentParams: Object;
	private request: Object;
	private byMonthsParams: Object;

	private getByMonthsParams;

	private seasonsParams = {
		values: [],
		selectedSeasonId: null
	};

	constructor(private activitiesService: ActivitiesService) {}

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any = {}) => {
				const data = res.Ski,
					seasons = data.seasons;

				this.ridesAmountParams = {
					data: seasons,
					fields: ['ridesAmount', 'quickRidesAmount', 'companyRidesAmount'],
					names: ['Кол-во поездок (шт)', 'По пляжу (шт)', 'С Саней (шт)']
				};

				this.speedParams = {
					data: seasons,
					fields: ['movingSpeed', 'totalSpeed'],
					names: ['Скорость в движении (км/ч)', 'Общая скорость (км/ч)']
				};

				this.detailSpeedParams = {
					data: seasons,
					fields: ['notQuickRidesMovingSpeed', 'notQuickRidesTotalSpeed', 'quickRidesMovingSpeed', 'quickRidesTotalSpeed'],
					names: ['Скорость за Волгу (км/ч)', 'Общ. скорость за Волгу (км/ч)', 'Скорость по пляжу (км/ч)', 'Общ. скорость по пляжу (км/ч)']
				};

				this.totalDistanceParams = {
					data: seasons,
					fields: ['totalDistance', 'quickRidesDistance', 'companyRidesDistance'],
					names: ['Общий пробег (км)', 'По пляжу (км)', 'С Саней (км)']
				};

				this.spentParams = {
					data: seasons,
					fields: ['elapsedTime', 'companyRidesTime'],
					names: ['Времени потрачено (ч)', 'С Саней (ч)']
				};

				this.byMonthsParams = {
					data: data.seasons[data.seasons.length - 1].distanceByMonths,
					fields: ['value'],
					names: ['Пробег по месяцам, км']
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
