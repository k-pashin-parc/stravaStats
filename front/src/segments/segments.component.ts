import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'activities/activities.service';
import { TableConfig } from 'config/table.config';
import { CommonTitleService } from 'common/title/title.service';

@Component({
	selector: 'segments',
	templateUrl: './segments.html',
	styleUrls: ['segments.sass']
})

export class SegmentsComponent {
	private data: Object;

	private tableConfig = {
		segments: TableConfig.segments,
		leaderboard: TableConfig.leaderboard
	};

	private isLoading: Boolean = true;
	private sectionName = 'Отрезки';

	private getLeaderboard (item) {
		if (!item.segments) {
			item.isLoading = true;

			this.activitiesService.getSegmentLeaderboard(item)
				.subscribe((res: any) => {
					item.segments = res;
					item.isLoading = false;
					item.isExpanded = true;
				}, () => item.isLoading = false);
		} else {
			item.isExpanded = !item.isExpanded;
		}
	}

	constructor(private route: ActivatedRoute, private activitiesService: ActivitiesService, private titleService: CommonTitleService) {
		this.titleService.setPageTitle(this.sectionName);
		this.titleService.setHeaderTitle(this.sectionName);

		this.route.params.subscribe((params) => {
			this.activitiesService.getSegments(params.id)
				.subscribe((res: any) => {

					this.data = res;
					this.isLoading = false;
				}, () => this.isLoading = false);
		});
	}
}
