import { Component, Input } from '@angular/core';

@Component({
	selector: 'no-data-component',
	templateUrl: './no_data.html',
	styleUrls: ['./no_data.sass']
})

export class CommonNoDataComponent {
	@Input() classes;
}
