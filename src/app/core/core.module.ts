import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { META_REDUCERS as metaReducers, STORE_INSTRUMENT }  from '@core/config/ngrx.config';
import { RouterEffects } from '@core/store/effects/router/router.effects';
import { reducers, CustomSerializer } from '@core/store';

import { HttpErrorInterceptor } from '@core/interceptors/error.interceptor';

import { environment } from '@environments/environment';
import { API_URL } from '@core/tokens/api-url.token';


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

