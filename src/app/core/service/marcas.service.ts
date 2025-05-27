import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService extends BaseAPIClass{
  getAllMarcas(): Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + '/marcas')
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/marcas';
  }
}
