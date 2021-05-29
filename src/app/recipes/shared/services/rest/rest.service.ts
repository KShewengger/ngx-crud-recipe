import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


export class RestService {

  constructor(
    protected http: HttpClient,
    protected apiUrl?: string
  ) { }

  generateUrl(uuid: string): string {
    return `${this.apiUrl}/recipes/${uuid}`;
  }

  get<T>(uuid: string = ''): Observable<T extends T[] ? T[] : T> {
    const url = this.generateUrl(uuid);
    return this.http.get<T extends T[] ? T[] : T>(url);
  }

  delete(uuid: string): Observable<Object> {
    const url = this.generateUrl(uuid);
    return this.http.delete(url);
  }

}
