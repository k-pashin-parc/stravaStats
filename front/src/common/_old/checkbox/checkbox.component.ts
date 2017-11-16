import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { MatCheckboxModule } from '@angular/material';

@Component({
	selector: 'checkbox',
	templateUrl: './checkbox.html',
	styleUrls: ['./checkbox.sass']
})

export class CheckboxComponent {
	@Input() model;

	@Input() label;
	@Input() className;

	@Output() dataChange = new EventEmitter()

	onModelChange(newValue) {
		this.dataChange.emit(newValue);
	}
}
