import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable() export class CommonTitleService {
	private headerTitle: String;

	constructor (private title: Title) {}

	public setHeaderTitle (title) {
		this.headerTitle = title;
	}

	public getHeaderTitle () {
		return this.headerTitle;
	}

	public setPageTitle (title) {
		this.title.setTitle(title);
	}

	public getPageTitle () {
		return this.title.getTitle();
	}

}
