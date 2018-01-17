import { Component, Input, ElementRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { CommonPopupService } from './popup.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { SplitsComponent } from './../../splits/splits.component';
import { SegmentsComponent } from './../../segments/segments.component';
import { AddContentDirective } from './../../common/add_content/add.content.directive';

@Component({
	selector: 'common-popup',
	templateUrl: './popup.html',
	styleUrls: ['popup.sass'],
	animations: [
		trigger('popupAnumation', [
			transition('void => *', [
				style({ transform: 'scale3d(.3, .3, .3)' }),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
			])
		])
	]
})

export class CommonPopupComponent {
	@ViewChild(AddContentDirective) addContent: AddContentDirective;

	private state: any;
	private data: Object[] = [];

	constructor(private popup: CommonPopupService, private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnInit() {
		this.popup.getState().subscribe(state => {
			this.state = state;

			if (state.contentDataReq) {
				state.isLoading = true;

				state.contentDataReq.subscribe((res) => {
					var componentFactory,
						viewContainerRef,
						componentRef;

					state.isLoading = false;
					this.data = res;

					componentFactory = this.componentFactoryResolver.resolveComponentFactory(state.contentComponent);
					viewContainerRef = this.addContent.viewContainerRef;

					viewContainerRef.clear();

					componentRef = viewContainerRef.createComponent(componentFactory);
					componentRef.instance['data'] = this.data;
				});
			}
		});
	}

	hide () {
		this.data = [];
		this.popup.hide();
	}
}
