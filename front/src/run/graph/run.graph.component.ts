import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';

@Component({
	selector: 'run-graph',
	templateUrl: './run.graph.html',
	animations: [routeAnimation]
})

export class RunGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities;

	private ridesAmountParams;
	private totalDistanceParams;
	private spentParams;

	ngOnInit () {
		this.activitiesService.getActivities()
			.subscribe((res: any) => {
				let data = res.Run;
				let seasons = data.seasons;

				this.ridesAmountParams = {
					data: seasons,
					fields: ['ridesAmount',],
					names: ['Кол-во забегов']
				};

				this.totalDistanceParams = {
					data: seasons,
					fields: ['totalDistance', 'movingSpeed'],
					names: ['Общий пробег (км)', 'Скорость в движении (км/ч)']
				};

				this.spentParams = {
					data: seasons,
					fields: ['elapsedTimeTotal'],
					names: ['Времени потрачено (ч)']
				};

				this.activities = data;
			});
	}
}
