import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'bike-graph',
	templateUrl: './bike.graph.html',
	animations: [routeAnimation]
})

@CommonUnsubscribe
export class BikeGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities: Object[];

	private ridesAmountParams: Object;
	private totalDistanceParams: Object;
	private spentParams: Object;
	private request: Object;

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
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
