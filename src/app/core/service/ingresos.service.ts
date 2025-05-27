import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class IngresosService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/ingresos';
  }


  deleteDetalle(id:any):Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/detalles/'+id)
  }

  pdfIngresos(id:any): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/pdf/'+id,{
      responseType: 'blob'
    });
  }
}
