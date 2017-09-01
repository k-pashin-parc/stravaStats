import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class ActivitiesService {
	private url = {
		summary: '/api/summary',
		detail: '/api/activity'
	};

	public isLoading: Boolean = false;
	public activities;

	constructor (private http: Http) {}

	requestActivities (): Observable<Object> {
		return this.http.get(this.url.summary)
										.map((res) => this.extractActivities(res))
										.catch((err) => this.handleError(err));
	}

	public getActivities () {
		this.isLoading = !this.activities;

		return this.activities ? Observable.of(this.activities) : this.requestActivities();
	}

	private extractActivities (res: Response) {
		let body = res.json();

		this.activities = body.data || {};
		this.isLoading = false;

		return this.activities;
	}

	public getDetail = (item) => {
		let params = {
			id: item.id
		};

		item.isLoading = true;

		this.http
			.get(this.url.detail, {params: params})
			.map(res => res.json())
			.subscribe(res => {
				item.detail = res
				item.isLoading = false;
			});
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
