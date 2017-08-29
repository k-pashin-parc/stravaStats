import { RouterModule, Routes } from '@angular/router';

import { SkiGraphComponent } from 'ski/graph/ski.graph.component';
import { SkiDetailComponent} from 'ski/detail/ski.detail.component';
import { RunGraphComponent } from 'run/graph/run.graph.component';
import { RunDetailComponent } from 'run/detail/run.detail.component';
import { BikeGraphComponent } from 'bike/graph/bike.graph.component';
import { BikeDetailComponent } from 'bike/detail/bike.detail.component';

export const routes: Routes = [
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
		}]
	}
];
