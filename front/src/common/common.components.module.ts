import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatCardModule } from '@angular/material/card';

import { LoaderComponent } from './loader/loader.component';
import { ChartComponent} from './chart/chart.component';
import { MatTableCommonComponent } from './mat_table/mat_table.component';

import { CommonPopupService } from './popup/popup.service';
import { CommonPopupComponent } from './popup/popup.component';
import { AddContentDirective } from './add_content/add.content.directive';
import { CommonTitleService} from './title/title.service';
import { CommonNoDataComponent } from './no_data/no_data.component';
import { MatSelectModule } from '@angular/material/select';

import { FieldFormatterPipe } from './pipes/field_formatter.pipe';

@NgModule({
	declarations: [
		LoaderComponent,
		ChartComponent,
		MatTableCommonComponent,
		CommonPopupComponent,
		AddContentDirective,
		CommonNoDataComponent,
		FieldFormatterPipe,
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
		AddContentDirective,
		MatCardModule,
		CommonNoDataComponent,
		FieldFormatterPipe,
		MatSelectModule,
		BrowserAnimationsModule,
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
		MatCheckboxModule,
		RouterModule,
		MatCardModule,
		MatSelectModule,

	],
	providers: [CommonPopupService, CommonTitleService]
})

export class CommonComponentsModule {}
