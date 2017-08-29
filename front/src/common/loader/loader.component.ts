import { Component, Input } from '@angular/core';

@Component({
	selector: 'loader',
	templateUrl: './loader.html',
	styleUrls: ['./loader.sass']
})

export class LoaderComponent {
	@Input() type;
	@Input() isLoading;
}
