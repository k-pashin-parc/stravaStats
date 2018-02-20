import { forEach } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'activities/activities.service';
import { TableConfig } from 'config/table.config';
import { CommonTitleService } from 'common/title/title.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
	selector: 'segments',
	templateUrl: './segments.html',
	styleUrls: ['segments.sass']
})

export class SegmentsComponent {
	private data: Object;

	private tableConfig = TableConfig;

	private isLoading: Boolean = true;
	private sectionName = 'Участки';

	private segmentMode = {
		values: [{
			Id: 'all',
			Name: 'Все'
		}, {
			Id: 'my',
			Name: 'Только мои'
		}]
	};

	private getSegmentEfforts (item) {
		if (!item.segments) {
			const reqs = [
				this.activitiesService.getSegmentLeaderboard(item),
				this.activitiesService.getSegmentMyEfforts(item),
				this.activitiesService.getSegmentMap(item.id)
			];

			item.isLoading = true;

			this.data['segments'].forEach((el) => {
				el.isExpanded = false;
			});

			forkJoin(reqs).subscribe((res) => {
				item.segments = res[0];
				item.myEfforts = res[1];
				item.map = res[2];

				item.isExpanded = true;
				item.isLoading = false;
			}, () => this.isLoading = false);
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
					this.titleService.setPageTitle(`${this.sectionName} – ${res.name}`);
					this.data = res;

					this.data['segments'].forEach((el) => {
						el.segmentMode = 'all';
					});

					this.isLoading = false;
				}, () => this.isLoading = false);
		});


	}
}
