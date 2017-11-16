import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { dataConfig } from './../config/data.config';

@Injectable()
export class ActivitiesService {
	private url = {
		summary: '/api/summary',
		detail: '/api/activity'
	};

	private isLoading: Boolean = false;
	private activities: Object[];

	constructor (private http: Http) {}

	requestActivities (): Observable<Object> {
		return this.http.get(this.url.summary, {params: dataConfig})
										.map((res) => this.extractActivities(res))
										.catch((err) => this.handleError(err));
	}

	public getActivities () {
		this.isLoading = !this.activities;

		return this.activities ? Observable.of(this.activities) : this.requestActivities();
	}

	private extractActivities (res: Response): Object[] {
		var body = res.json();

		this.activities = body.data || {};
		this.isLoading = false;

		return this.activities;
	}

	public getDetail (id) {
		var params = {
			id: id
		};

		return this.http
			.get(this.url.detail, {params: params})
			.map(res => res.json());
	}

	private handleError (error: Response | any) {
		let errMsg: string;

		this.isLoading = false;

		if (error instanceof Response) {
			errMsg = error.statusText;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		return Observable.throw(errMsg);
	}
}
