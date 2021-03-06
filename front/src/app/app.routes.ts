import { RouterModule, Routes } from '@angular/router';

import { SkiGraphComponent } from 'ski/graph/ski.graph.component';
import { SkiDetailComponent} from 'ski/detail/ski.detail.component';
import { RunGraphComponent } from 'run/graph/run.graph.component';
import { RunDetailComponent } from 'run/detail/run.detail.component';
import { BikeGraphComponent } from 'bike/graph/bike.graph.component';
import { BikeDetailComponent } from 'bike/detail/bike.detail.component';
import { DefaultRouteCongif } from 'config/default_route.config';
import { SegmentsComponent } from './../segments/segments.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: DefaultRouteCongif.route,
		pathMatch: 'full'
	},
	{
		path: 'ski',
		data: {
			stateName: 'ski'
		},
		children: [{
			path: '',
			redirectTo: 'graph',
			pathMatch: 'full'
		}, {
			path: 'graph',
			component: SkiGraphComponent
		}, {
			path: 'detail',
			component: SkiDetailComponent
		}, {
			path: 'detail/:id',
			component: SkiDetailComponent
		}]
	},
	{
		path: 'run',
		data: {
			stateName: 'run'
		},
		children: [{
			path: '',
			redirectTo: 'graph',
			pathMatch: 'full'
		}, {
			path: 'graph',
			component: RunGraphComponent
		}, {
			path: 'detail',
			component: RunDetailComponent
		}, {
			path: 'detail/:id',
			component: RunDetailComponent
		}]
	},
	{
		path: 'bike',
		data: {
			stateName: 'bike'
		},
		children: [{
			path: '',
			redirectTo: 'graph',
			pathMatch: 'full'
		}, {
			path: 'graph',
			component: BikeGraphComponent
		}, {
			path: 'detail',
			component: BikeDetailComponent
		}, {
			path: 'detail/:id',
			component: BikeDetailComponent
		}]
	}, {
		path: 'segments/:id',
		data: {
			stateName: 'segments'
		},
		component: SegmentsComponent,
		pathMatch: 'full'
	}
];
