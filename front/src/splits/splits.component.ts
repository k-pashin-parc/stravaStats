import { Component, Input } from '@angular/core';

@Component({
	selector: 'splits',
	templateUrl: './splits.html',
	styleUrls: ['splits.sass']
})

export class SplitsComponent {
	@Input() data;
}
