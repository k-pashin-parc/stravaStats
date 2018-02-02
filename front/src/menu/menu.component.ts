import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonTitleService} from 'common/title/title.service';

interface MenuItem {
	Name: String,
	Url: String,
	Items?: Object[]
}

@Component({
	selector: 'main-menu',
	templateUrl: './menu.html',
	styleUrls: ['./menu.sass']
})

export class MenuComponent {
	private currentMenu: MenuItem;

	private items: MenuItem[] = [{
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

	private isShowMenu: Boolean = true;

	constructor(private router: Router, route: ActivatedRoute, private titleService: CommonTitleService) {
		router.events.subscribe(event => {
			let snapshot = route.snapshot,
				activated = route.firstChild;

			if (activated !== null) {
				while (activated !== null) {
					snapshot = activated.snapshot;
					activated = activated.firstChild;
				}
			}

			this.isShowMenu = snapshot.data.stateName !== 'segments';

			let item = this.items.filter(item => item.Url === snapshot.data['stateName']);

			if (item.length) {
				this.currentMenu = item[0];
			}
		});
	}
}
