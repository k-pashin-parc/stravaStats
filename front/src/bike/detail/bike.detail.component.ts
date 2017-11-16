import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { TableConfig } from 'config/table.config'
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'bike-detail',
	templateUrl: './bike.detail.html',
	animations: [routeAnimation]
})

@CommonUnsubscribe
export class BikeDetailComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities: Object[];
	private tableConfig = TableConfig;
	private request: Object;

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any) => {
				this.activities = res.Ride.activities;
			});
	}
}
