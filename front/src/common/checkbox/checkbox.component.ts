import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'checkbox',
	templateUrl: './checkbox.html',
	styleUrls: ['./checkbox.sass']
})

export class CheckboxComponent {
	@Input() data;
	@Input() label;
	@Input() className;

	@Output() dataChange = new EventEmitter()

	onModelChange(newValue) {
		this.dataChange.emit(newValue);
	}
}
