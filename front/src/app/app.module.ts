import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { routes } from './app.routes';
import { CommonComponentsModule } from '../common/common.components.module';
import { AppComponent } from './app.component';
import { MenuComponent } from 'menu/menu.component';
import { ActivitiesService } from 'activities/activities.service';
import { SkiGraphComponent } from 'ski/graph/ski.graph.component';
import { SkiDetailComponent} from 'ski/detail/ski.detail.component';

import { RunGraphComponent } from 'run/graph/run.graph.component';
import { RunDetailComponent } from 'run/detail/run.detail.component';

import { BikeGraphComponent } from 'bike/graph/bike.graph.component';
import { BikeDetailComponent } from 'bike/detail/bike.detail.component';

import { SplitsComponent } from 'splits/splits.component';
import { SegmentsComponent } from 'segments/segments.component';

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		SkiGraphComponent,
		SkiDetailComponent,
		RunGraphComponent,
		RunDetailComponent,
		BikeGraphComponent,
		BikeDetailComponent,
		SplitsComponent,
		SegmentsComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot(routes, {
			useHash: true
		}),
		CommonComponentsModule,
		BrowserAnimationsModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAx4-Mac2qbfdu979utDElN675zL5Dl-e4'
		})
	],
	providers: [ActivitiesService],
	bootstrap: [AppComponent],
	entryComponents: [SplitsComponent, SegmentsComponent]
})

export class AppModule {}
