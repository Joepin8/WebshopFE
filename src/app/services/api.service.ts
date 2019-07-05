import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AuthorizationService} from './authorization.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthorizationService) {

  }

  private createQueryString(queryParameters: object): string {
    let queryString = '';

    if (typeof queryParameters === 'object') {
      for (let key in queryParameters) {
        const value = queryParameters[key];
        const prefix = queryString.length === 0 ? '?' : '&';

        queryString += `${prefix}${key}=${value}`;
      }
    }

    return queryString;
  }

  private createURI(path: string, queryParameters: object): string {
    const queryString = this.createQueryString(queryParameters);

    return environment.api + `${path}${queryString}`;
  }

  private createRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.authService.hasAuthorization()) {
      headers = headers.set('Authorization', this.authService.createAuthorizationString());
    }

    return headers;
  }

  public get<T>(path: string, queryParameters?: object): Observable<T> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.get<T>(uri, { headers });
  }

  public post<T>(path: string, data: object, queryParameters?: object): Observable<T> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.post<T>(uri, data, { headers });
  }

  public put<T>(path: string, data: object, queryParameters?: object): Observable<T> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.put<T>(uri, data, { headers });
  }

  public delete<T>(path: string, queryParameters?: object): Observable<T> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();
    console.log('de uri is dit geworden:' + uri);
    return this.http.delete<T>(uri, { headers });
  }
}
