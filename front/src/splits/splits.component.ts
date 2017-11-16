import { Component, Input } from '@angular/core';

@Component({
	selector: 'splits',
	templateUrl: './splits.html'
})

export class SplitsComponent {
	@Input() data;
}
