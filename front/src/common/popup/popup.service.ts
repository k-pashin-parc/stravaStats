import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable() export class CommonPopupService {
	private state = new Subject();
	private isOpened = false;

	public getState(): Observable<any> {
		return this.state.asObservable();
	}

	private setState (state) {
		this.state.next(state);
	}

	public show (data) {
		this.setState({
			title: data.title,
			isOpened: true,
			contentDataReq: data.contentDataReq,
			contentComponent: data.contentComponent
		});
	}

	public hide () {
		this.setState({isOpened: false});
	}
}
