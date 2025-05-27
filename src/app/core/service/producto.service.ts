import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/productos';
  }
  enableProducto(id: number) {
    return this.httpClient.get(this.baseUrl + '/habilitar/' + id);
  }
  destacarProducto(id: number) {
    return this.httpClient.get(this.baseUrl + '/destacar/' + id)
  }
  deleteColores(id:any):Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/color/'+id);
  }
}
