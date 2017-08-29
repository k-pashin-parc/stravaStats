import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class ActivitiesService {
	private url: string = '/api/summary';

	public isLoading: Boolean = false;
	public activities;

	constructor (private http: Http) {}

	requestActivities (): Observable<{}> {
		return this.http.get(this.url)
										.map((res) => this.extractData(res))
										.catch((err) => this.handleError(err));
	}

	public getActivities () {
		this.isLoading = !this.activities;

		return this.activities ? Observable.of(this.activities) : this.requestActivities();
	}

	private extractData (res: Response) {
		let body = res.json();

		this.activities = body.data || {};
		this.isLoading = false;

		return this.activities;
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
