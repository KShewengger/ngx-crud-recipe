import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl, State } from '@core/store/models';


export const reducers: ActionReducerMap<State> = { routerReducer };
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export * from './router/router.reducer';
