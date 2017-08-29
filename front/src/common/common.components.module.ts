import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';

import { LoaderComponent } from './loader/loader.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { BtnComponent } from './btn/btn.component';
import { TableComponent} from './table/table.comonent';
import { ChartComponent} from './chart/chart.component';
import { OrderByPipe } from './pipes/order.pipe';
import { CheckboxComponent } from './checkbox/checkbox.component'

@NgModule({
	declarations: [
		BtnComponent,
		LoaderComponent,
		TextfieldComponent,
		TableComponent,
		ChartComponent,
		OrderByPipe,
		CheckboxComponent
	],
	exports: [
		BtnComponent,
		LoaderComponent,
		TextfieldComponent,
		TableComponent,
		ChartComponent,
		OrderByPipe,
		CheckboxComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		ChartsModule
	]
})

export class CommonComponentsModule {}
