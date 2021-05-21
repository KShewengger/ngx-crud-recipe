import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { environment } from '@environments/environment';
import { API_URL } from '@app/shared/tokens/api-url.token';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: API_URL, useValue: environment.API_URL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
