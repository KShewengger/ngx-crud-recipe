import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


export class RestService {

  constructor(
    protected http: HttpClient,
    protected apiUrl?: string
  ) { }

  generateUrl(endpoint: string, uuid: string): string {
    return `${this.apiUrl}/${endpoint}/${uuid}`;
  }

  get<T>(endpoint: string, uuid: string = ''): Observable<T extends T[] ? T[] : T> {
    const url = this.generateUrl(endpoint, uuid);
    return this.http.get<T extends T[] ? T[] : T>(url);
  }

}
