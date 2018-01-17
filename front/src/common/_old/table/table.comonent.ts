import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { TableConfig } from 'config/table.config';
import { ActivitiesService } from 'activities/activities.service';

@Component({
	selector: 'table-common',
	templateUrl: './table.html',
	styleUrls: ['./table.sass']
})

export class TableComponent implements OnInit, OnChanges {
	@Input() data: object[];
	@Input() fields: string[];
	@Input() colNames: string[];
	@Input() label: string;
	@Input() type: string;
	@Input() withPagination: boolean;

	constructor(private activitiesService: ActivitiesService) {}

	private PAGE_SIZE: number = 10;

	private sortBy = {
		field: <string>'date',
		type: <string>'desc'
	};

	private pagination = {
		page: <number>1,
		pageSize: <number>this.PAGE_SIZE,
		hasNextPage: false,
		startItem: <number>0,
		endItem: <number>null,
		totalItems: <number>null
	};

	private tableConfig = TableConfig;

	private isNumber = function (val: any):boolean {
		return typeof val === 'number';
	};

	private sort = (field: string) => {
		if (this.sortBy['field'] === field) {
			if (this.sortBy['type'] === 'desc') {
				this.sortBy['type'] = 'asc';
			} else {
				this.sortBy['type'] = 'desc';
			}
		} else {
			this.sortBy['type'] = 'asc';
		}

		this.sortBy['field'] = field;
	};

	private changePage = (dir: number) => {
		this.pagination.page += dir;
		this.pagination.hasNextPage = this.getHasNextPage();
		this.pagination.startItem += dir * this.pagination.pageSize;
		this.pagination.endItem += dir * this.pagination.pageSize;
	};

	private getHasNextPage = (): boolean => {
		var itemsAmount = this.data.length,
			pagesAmount = Math.ceil(itemsAmount / this.pagination.pageSize);

		return pagesAmount !== this.pagination.page;
	};

	private getEndItem = ():number => {
		return this.data.length > this.pagination.pageSize ? this.pagination.pageSize : this.data.length;
	};

	private resetPagination = () => {
		this.pagination.page = 1;
		this.pagination.startItem = 0;
		this.pagination.endItem = this.pagination.pageSize;
		this.pagination.hasNextPage = this.getHasNextPage();
		this.pagination.totalItems = this.data.length;
		this.pagination.endItem = this.getEndItem();
	};

	private toggleRow = (item) => {
		item.isExpanded = !item.isExpanded;

		// if (!item.detail) {
		// 	this.activitiesService.getDetail(item);
		// }
	};

	ngOnInit () {
		this.pagination.endItem = this.getEndItem();
	};

	ngOnChanges () {
		this.resetPagination();
	};
}
