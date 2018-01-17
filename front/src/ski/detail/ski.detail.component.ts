import { Observable } from 'rxjs/Observable';
import { HostBinding, Component, OnInit, EventEmitter } from '@angular/core';
import {filter, keys, forOwn, forEach} from 'lodash';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'ski-detail',
	templateUrl: './ski.detail.html',
	animations: [routeAnimation],
	styleUrls: ['./ski.detail.sass']
})

@CommonUnsubscribe
export class SkiDetailComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	private activities: Object[];
	private allActivities: Object[];
	private request: Object;

	private filterConf: Object[] = [{
		name: 'Пляж',
		key: 'is_quick',
		val: true
	}, {
		name: 'Заволга',
		key: 'is_not_quick',
		val: true
	}, {
		name: 'Чайка',
		key: 'is_on_base',
		val: true
	}];

	constructor(private activitiesService: ActivitiesService) {}

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any) => {
				this.activities = res.Ski.activities;
			});
	}
}
