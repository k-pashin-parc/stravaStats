import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'main-menu',
	templateUrl: './menu.html',
	styleUrls: ['./menu.sass']
})

export class MenuComponent {
	constructor(private router:Router, route : ActivatedRoute) {
		router.events.subscribe(event => {
			let snapshot = route.snapshot;
			let activated = route.firstChild;

			if (activated !== null) {
				while (activated !== null) {
					snapshot = activated.snapshot;
					activated = activated.firstChild;
				}
			}

			let item = this.items.filter(item => item.Url === snapshot.data['stateName']);

			if (item.length) {
				this.currentMenu = item[0];
			}
		});
	}

	private currentMenu;

	private items = [{
		Name: 'Лыжи',
		Url: 'ski',
		Items: [{
			Name: 'Общая информация',
			Url: 'graph'
		}, {
			Name: 'Подробно',
			Url: 'detail'
		}]
	}, {
		Name: 'Бег',
		Url: 'run',
		Items: [{
			Name: 'Общая информация',
			Url: 'graph'
		}, {
			Name: 'Подробно',
			Url: 'detail'
		}]
	}, {
		Name: 'Вел',
		Url: 'bike',
		Items: [{
			Name: 'Общая информация',
			Url: 'graph'
		}, {
			Name: 'Подробно',
			Url: 'detail'
		}]
	}];
}
