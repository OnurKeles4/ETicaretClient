import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectEncodingOptions } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParameter: RequestParameters): string {
    return `${
      requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl
    }/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ''
    }`;
  }

  get<T>(
    requestParameters: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameters.fullEndPoint) {
      console.log('fullEndPoint');
      url = requestParameters.fullEndPoint;
    } else {
      url = `${this.url(requestParameters)}`;
      //console.log('NormalURL');
    }

    if(id != null) {
      url = url + '/' + id;
    }
    console.log(requestParameters);
    return this.httpClient.get<T>(url, { headers: requestParameters.headers });
  }

  post<T>(
    requestParameters: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';

    if (requestParameters.fullEndPoint) {
      console.log('fullEndPoint');
      url = requestParameters.fullEndPoint;
    } else {
      url = `${this.url(requestParameters)}`;
      //console.log('NormalURL');
    }
    console.log(url);
    return this.httpClient.post<T>(url, body, {
      headers: requestParameters.headers,
    });
  }

  put<T>(
    requestParameters: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';

    if (requestParameters.fullEndPoint) {
      url = requestParameters.fullEndPoint;
    } else url = `${this.url(requestParameters)}`;

    console.log(url);
    return this.httpClient.put<T>(url, body, {
      headers: requestParameters.headers,
    });
  }
  delete<T>(
    requestParameters: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = '';

    if (requestParameters.fullEndPoint) {
      //console.log( "fullEndPoint");
      url = requestParameters.fullEndPoint;
    } else {
      //console.log( "NormalURL");

      url = this.url(requestParameters) + `/` + id;
    }
    console.log(url);
    return this.httpClient.delete<T>(url, {
      headers: requestParameters.headers,
    });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
