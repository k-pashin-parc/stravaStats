import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const routeAnimation =
	trigger('routeAnimation', [
		state('*', style({
				position: 'absolute',
				left: '32px',
				top: '32px',
				right: '32px',
				bottom: '64px',
				opacity: 1
		})),
		transition(':enter', [
			style({
				position: 'absolute',
				left: '32px',
				top: '32px',
				right: '32px',
				bottom: '64px',
				opacity: 0
			}),
			animate('.5s ease-in-out', style({
				opacity: 1
			}))
		]),
		transition(':leave', [
			animate('.5s ease-in-out', style({
				opacity: 0
			}))
		])
]);
