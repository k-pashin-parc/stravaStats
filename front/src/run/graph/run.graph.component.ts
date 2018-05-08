import { HostBinding, Component, OnInit } from '@angular/core';

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

	constructor(private activitiesService: ActivitiesService) {}

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any) => {
				var data = res.Run,
					seasons = data.seasons;

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
					fields: ['elapsedTime'],
					names: ['Времени потрачено (ч)']
				};

				this.activities = data;
			});
	}
}
