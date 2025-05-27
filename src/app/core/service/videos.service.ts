import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';

@Injectable({
  providedIn: 'root'
})
export class VideosService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/videos'
  }
}
