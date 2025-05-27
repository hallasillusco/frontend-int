import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/ventas'
  }
  getVentasPDF(id: any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/pdf/'+ id,{responseType:'blob'});
  }

  ventasProforma(id:any,form:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/proformas/'+id,form)
  }

  ventaProformasWeb(form:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/webproformas',form)
  }
}

