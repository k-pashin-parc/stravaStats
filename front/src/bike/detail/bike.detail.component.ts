import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { TableConfig } from 'config/table.config'
import { routeAnimation } from 'common/animations/animations';

@Component({
	selector: 'bike-detail',
	templateUrl: './bike.detail.html',
	animations: [routeAnimation]
})

export class BikeDetailComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities;
	private tableConfig = TableConfig;

	ngOnInit () {
		this.activitiesService.getActivities()
			.subscribe((res: any) => {
				this.activities = res.Ride.activities;
			});
	}
}
