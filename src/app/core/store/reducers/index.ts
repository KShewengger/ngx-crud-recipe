import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { State } from '@core/store/models';


export const reducers: ActionReducerMap<State> = { routerReducer };

