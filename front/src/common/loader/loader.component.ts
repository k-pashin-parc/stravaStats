import { Component, Input } from '@angular/core';

@Component({
	selector: 'loader',
	templateUrl: './loader.html',
	styleUrls: ['./loader.sass']
})

export class LoaderComponent {
	@Input() isLoading;
	@Input() diameter: number = 48;
	@Input() strokeWidth: number = 3;
	@Input() mode: string = 'indeterminate';
}
