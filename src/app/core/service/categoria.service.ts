import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class/baseAPI.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/categorias';

  }

  tipos(tipo_id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/tipos/'+tipo_id)
  }
}
