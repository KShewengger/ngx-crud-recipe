import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { API_URL } from '@core/tokens';
import { HttpErrorInterceptor } from '@core/interceptors';
import { META_REDUCERS as metaReducers, STORE_INSTRUMENT }  from '@core/config';
import { RouterEffects, reducers, CustomSerializer } from '@core/store';

import { environment } from '@environments/environment';


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    STORE_INSTRUMENT,
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }

