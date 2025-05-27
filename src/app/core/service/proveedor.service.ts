import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/proveedores';
  }
  enableProveedor(id: number) {
    return this.httpClient.get(this.baseUrl + '/habilitar/' + id);
  }
}
