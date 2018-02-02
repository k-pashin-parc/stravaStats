import { Component, Input, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import _ from 'lodash';

import { TableConfig } from 'config/table.config';
import { CommonPopupService } from 'common/popup/popup.service';
import { ActivitiesService } from 'activities/activities.service';
import { SplitsComponent } from './../../splits/splits.component';

@Component({
	selector: 'mat-table-common',
	templateUrl: './mat_table.html',
	styleUrls: ['mat_table.sass']
})

export class MatTableCommonComponent implements OnInit {
	@Input() data;
	@Input() tableType;
	@Input() filterConf;
	@Input() classes;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filterCheckboxes') filterCheckboxes: ElementRef;

	private dataSource: TableDataSource;
	private tableConfig: Object;
	private splitsComponent = SplitsComponent;

	constructor(private commonPopupService: CommonPopupService, private activitiesService: ActivitiesService, private route: ActivatedRoute) {}

	ngOnInit () {
		this.tableConfig = TableConfig[this.tableType];
		this.dataSource = new TableDataSource(this.data, this.sort, this.filterConf);

		this.route.params.subscribe((param) => {
			if (param.id) {
				this.showSplitsPopup(param.id, this.splitsComponent);
			}
		});

		if (this.filterConf) {
			setTimeout( () => {
				_.forEach(this.filterCheckboxes['nativeElement']['children'], (el) => {

					Observable.fromEvent(el, 'click')
						.debounceTime(250)
						.distinctUntilChanged()
						.subscribe(() => {
							this.dataSource.filter = this.dataSource['filterConf'];
						});
				});
			}, 0);
		}
	}

	showSplitsPopup (id, contentComponent) {
		this.commonPopupService.show({
			contentDataReq: this.activitiesService.getSpilts(id),
			contentComponent: contentComponent
		});
	}

	showSegmentsPopup (id, contentComponent) {
		this.commonPopupService.show({
			contentDataReq: this.activitiesService.getSegments(id),
			contentComponent: contentComponent
		});
	}
}

export class TableDataSource extends DataSource<any> {
	private dataChange = new BehaviorSubject(this.data);
	private originalData: Object[];
	private isEmpty: Boolean;

	_filterChange = new BehaviorSubject('');

	constructor(private data: Array<Object>, private _sort: MatSort, private filterConf: Object[]) {
		super();
		this.data = data;
		this.originalData = _.clone(data);
		this.filterConf = filterConf;
	}

	get filter(): any {
		return this._filterChange.value;
	}

	set filter(filter: any) {
		setTimeout(() => {
			this._filterChange.next(filter);
		}, 0);
	}

	connect(): Observable<Object[]> {
		const displayDataChanges = [
			this.dataChange,
			this._sort.sortChange,
			this._filterChange
		];

		return Observable.merge(...displayDataChanges).map(() => {
			var data = this.filterData(this.getSortedData(this.data));

			this.isEmpty = !data.length;

			return data;
		});
	}

	disconnect() {}

	getSortedData(data) {
		if (!this._sort.active || this._sort.direction === '') {
			return this.originalData;
		}

		return data.sort((a, b) => {
			let propertyA: number|string = '',
				propertyB: number|string = '',
				valueA,
				valueB;

			[propertyA, propertyB] = [a[this._sort.active], b[this._sort.active]];

			valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			valueB = isNaN(+propertyB) ? propertyB : +propertyB;

			return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
		});
	}

	filterData = function (data) {
		var res = [],
			filterObj = {};

		if (this.filterConf) {
			_.forEach(this.filterConf, function(el) { filterObj[el.key] = el.val; } );

			_.forEach(data, (act) => {
				_.forOwn(filterObj, (val, key) => {
					if (val && act[key]) {
						res.push(act);
					}
				});
			});
		} else {
			res = data;
		}

		return res;
	}
}
