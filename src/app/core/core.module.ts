import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from '@core/interceptors/error.interceptor';

import { environment } from '@environments/environment';
import { API_URL } from '@core/tokens/api-url.token';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }

