import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProformasService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/proformas'
  }
  getProformasPDF(id: any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/pdf/'+ id,{responseType:'blob'});
  }

  

}

