import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/clientes'
  }

  busquedaClienteWeb(form:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/buscar?nit='+form.nit+'&email='+form.email);
  }
}
