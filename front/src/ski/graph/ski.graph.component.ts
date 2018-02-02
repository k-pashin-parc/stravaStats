import { HostBinding, Component, OnInit } from '@angular/core';

import { ActivitiesService } from 'activities/activities.service';
import { routeAnimation } from 'common/animations/animations';
import { CommonUnsubscribe } from 'common/unsubscribe/unsubscribe.decorator';

@Component({
	selector: 'ski-graph',
	templateUrl: './ski.graph.html',
	animations: [routeAnimation]
})

@CommonUnsubscribe
export class SkiGraphComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;

	private activities: Object[];
	private ridesAmountParams: Object;
	private speedParams: Object;
	private detailSpeedParams: Object;
	private totalDistanceParams: Object;
	private spentParams: Object;
	private request: Object;

	constructor(private activitiesService: ActivitiesService) {}

	ngOnInit () {
		this.request = this.activitiesService.getActivities()
			.subscribe((res: any) => {
				var res = res || {},
					data = res.Ski,
					seasons = data.seasons;

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
					fields: ['elapsedTime', 'companyRidesTime'],
					names: ['Времени потрачено (ч)', 'С Саней (ч)']
				};

				this.activities = data;
			});
	}
}
