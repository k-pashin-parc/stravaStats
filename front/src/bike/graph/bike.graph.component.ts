import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';

@Component({
	selector: 'bike-graph',
	templateUrl: './bike.graph.html',
	animations: [routeAnimation]
})

export class BikeGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities;

	private ridesAmountParams;
	private totalDistanceParams;
	private spentParams;

	ngOnInit () {
		this.activitiesService.getActivities()
			.subscribe((res: any) => {
				let data = res.Ride;
				let seasons = data.seasons;

				this.ridesAmountParams = {
					data: seasons,
					fields: ['ridesAmount',],
					names: ['Кол-во заездов']
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
