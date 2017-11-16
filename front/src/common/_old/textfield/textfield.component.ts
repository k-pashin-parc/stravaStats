import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'textfield',
	templateUrl: './textfield.html',
	styleUrls: ['./textfield.sass']
})

export class TextfieldComponent {
	@Input() data;
	@Input() type: String;
	@Input() label: String;
	@Input() placeholder: String;

	@Output() dataChange = new EventEmitter()

	onModelChange(newValue) {
		this.dataChange.emit(newValue);
	}
}
