import { Component, Input } from '@angular/core';

@Component({
	selector: 'segments',
	templateUrl: './segments.html',
	styleUrls: ['segments.sass']
})

export class SegmentsComponent {
	@Input() data;
}
