import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class reportesService extends BaseAPIClass {
  [x: string]: any;
  reporte_existencias(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/reportes'
  }
  getExistencias():Observable<any>{
    return this.httpClient.get(this.baseUrl + '/existencias');
  }
  getExistenciasPDF():Observable<any>{
    return this.httpClient.get(this.baseUrl + '/existenciaspdf',{responseType:'blob'});
  }

  getVentas(filterObject?: any):Observable<any>{
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
      
    }

    return this.httpClient.get(`${this.baseUrl}/ventaproductos${queryString}`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
  getVentasPDF(filterObject?: any):Observable<any>{
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
      
    }

    return this.httpClient.get(`${this.baseUrl}/ventaproductospdf${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getDatos():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/datos');
  }
  getDatosMasvendidos():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/masvendidos');
  }
  getDatosAgotados():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/agotados');
  }
  getDatosVentas():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/graficaventas');
  }
  getDatosCategorias():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/graficacategorias');
  }
}

