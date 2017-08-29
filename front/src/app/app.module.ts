import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		SkiGraphComponent,
		SkiDetailComponent,
		RunGraphComponent,
		RunDetailComponent,
		BikeGraphComponent,
		BikeDetailComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot(routes, {
			useHash: true
		}),
		CommonComponentsModule,
		BrowserAnimationsModule
	],
	providers: [ActivitiesService],
	bootstrap: [AppComponent]
})

export class AppModule {}
