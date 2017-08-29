import { HostBinding, Component, OnInit } from '@angular/core';
import {filter, keys, forOwn, forEach} from 'lodash';

import { ActivitiesService } from 'activities/activities.service';
import { TableConfig } from 'config/table.config'
import { routeAnimation } from 'common/animations/animations';

@Component({
	selector: 'ski-detail',
	templateUrl: './ski.detail.html',
	animations: [routeAnimation]
})

export class SkiDetailComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	constructor(private activitiesService: ActivitiesService) {}

	private activities;
	private allActivities;
	private tableConfig = TableConfig;

	private activityKind = {
		// is_quick: true,
		is_not_quick: true,
		// is_on_base: true
	};

	private filterActivities = () => {
		var res = [];

		forEach(this.allActivities, (act) => {
			forOwn(this.activityKind, (val, key) => {
				if (val && act[key]) {
					res.push(act)
				}
			});
		});

		this.activities = res;
	};

	ngOnInit () {
		this.activitiesService.getActivities()
			.subscribe((res: any) => {
				// console.log(res);
				this.allActivities = res.Ski.activities;
				this.filterActivities();
			});
	}
}
