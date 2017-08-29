import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';

@Component({
	selector: 'ski-graph',
	templateUrl: './ski.graph.html',
	animations: [routeAnimation]
})

export class SkiGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities;

	private ridesAmountParams;
	private speedParams;
	private detailSpeedParams;
	private totalDistanceParams;
	private spentParams;

	ngOnInit () {
		this.activitiesService.getActivities()
			.subscribe((res: any) => {
				res = res || {};
				let data = res.Ski;
				let seasons = data.seasons;

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
					fields: ['elapsedTimeTotal', 'companyRidesTime'],
					names: ['Времени потрачено (ч)', 'С Саней (ч)']
				};

				this.activities = data;
			},
			(err: any) => {
				alert(err);
			});
	}
}
