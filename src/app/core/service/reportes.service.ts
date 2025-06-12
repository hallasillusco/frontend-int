import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '@core/class';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class reportesService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = `${environment.apiUrl}/reportes`;  // ✅ Solo una vez
  }

  getDatos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/datos`);  // ✅ Solo this.baseUrl
  }

  getDatosComparativaMensual(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getDatosComparativaMensual`);
  }

  getDatosMasVendidos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getDatosMasVendidos`);
  }

  getDatosAgotados(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/agotados`);
  }

  getDatosVentas(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/graficaventas`);
  }

  getDatosCategorias(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/graficacategorias`);
  }

  getDatosPrediccion(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getDatosPrediccion`);
  }

  getExistencias(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/existencias`);
  }

  getExistenciasPDF(): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/existenciaspdf`, {
      responseType: 'blob'
    });
  }

  getVentas(params: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/ventaproductos`, { params });
  }

  getVentasPDF(params: any): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/ventaproductospdf`, {
      params,
      responseType: 'blob'
    });
  }
}
