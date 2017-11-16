import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { Sort } from '@angular/material';

import { LoaderComponent } from './loader/loader.component';
import { ChartComponent} from './chart/chart.component';
import { MatTableCommonComponent } from './mat_table/mat_table.component';

import { CommonPopupService } from './popup/popup.service';
import { CommonPopupComponent } from './popup/popup.component';
import { AddContentDirective } from './add_content/add.content.directive';

@NgModule({
	declarations: [
		LoaderComponent,
		ChartComponent,
		MatTableCommonComponent,
		CommonPopupComponent,
		AddContentDirective
	],
	exports: [
		LoaderComponent,
		ChartComponent,
		MatTabsModule,
		MatButtonModule,
		MatTableCommonComponent,
		MatSortModule,
		MatCheckboxModule,
		CommonPopupComponent,
		AddContentDirective
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		ChartsModule,
		MatProgressSpinnerModule,
		MatTableModule,
		CdkTableModule,
		MatSortModule,
		MatCheckboxModule
	],
	providers: [CommonPopupService]
})

export class CommonComponentsModule {}
