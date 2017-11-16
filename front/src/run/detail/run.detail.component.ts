import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'run-detail',
	templateUrl: './run.detail.html',
	animations: [routeAnimation]
})

@CommonUnsubscribe
export class RunDetailComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	private activities: Object[];
	private request: Object;

	constructor(private activitiesService: ActivitiesService) {}

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any) => {
				this.activities = res.Run.activities;
			});
	}
}
