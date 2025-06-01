import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class reportesService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/reportes';
  }

  reporte_existencias(id: any) {
    throw new Error('Method not implemented.');
  }

  getExistencias(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/existencias');
  }

  getExistenciasPDF(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/existenciaspdf', { responseType: 'blob' });
  }

  getVentas(filterObject?: any): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const filterKeys: any[] = Object.keys(filterObject);
      if (filterKeys.length > 0) {
        queryString = '?';
      }
      filterKeys.forEach((key: any) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (filterKeys.length > 0 && queryString.endsWith('&')) {
        queryString = queryString.slice(0, -1);
      }
    }

    return this.httpClient.get(`${this.baseUrl}/ventaproductos${queryString}`).pipe(
      map((body: any) => body)
    );
  }

  getVentasPDF(filterObject?: any): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const filterKeys: any[] = Object.keys(filterObject);
      if (filterKeys.length > 0) {
        queryString = '?';
      }
      filterKeys.forEach((key: any) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (filterKeys.length > 0 && queryString.endsWith('&')) {
        queryString = queryString.slice(0, -1);
      }
    }

    return this.httpClient.get(`${this.baseUrl}/ventaproductospdf${queryString}`, { responseType: 'blob' }).pipe(
      map((body: any) => body)
    );
  }

  getDatos(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/datos');
  }

  getDatosMasvendidos(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/masvendidos');
  }

  getDatosAgotados(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/agotados');
  }

  getDatosVentas(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/graficaventas');
  }

  getDatosCategorias(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/graficacategorias');
  }

  // CORREGIDO: Método con URL completa bien formada
  getDatosPrediccion(): Observable<any> {
   return this.httpClient.get(`${this.baseUrl}/getDatosPrediccion`);
  }
}
