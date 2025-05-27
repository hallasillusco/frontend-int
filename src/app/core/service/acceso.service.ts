import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';

@Injectable({
  providedIn: 'root'
})
export class AccesoService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/accesos';
  }

  enableAcceso(id:any) {
    return this.httpClient.get(this.baseUrl + '/habilitado/');
  }
}
