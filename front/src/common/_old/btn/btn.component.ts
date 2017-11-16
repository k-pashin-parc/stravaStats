import { Component, Input } from '@angular/core';

@Component({
	selector: 'btn',
	templateUrl: './btn.html',
	styleUrls: ['./btn.sass']
})

export class BtnComponent {
	@Input() title;
	@Input() type;
}
