import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '@core/class';

@Injectable({
  providedIn: 'root'
})
export class LotesService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/lotes';
  }

  deleteDetalle(id:any):Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/detalles/'+id)
  }

  enableLotes() {
    return this.httpClient.get(this.baseUrl + '/habilitado/');
  }
}
