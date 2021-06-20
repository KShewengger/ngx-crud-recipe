import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from '@core/store';


export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');
