import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class/baseAPI.class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/web'
  }

  getProductos(filterObject?: any):Observable<any>{
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

    return this.httpClient.get(this.baseUrl+`/productos${queryString}`).pipe(
      map((body: any) => {
        return body;
      })
    );


  }

  getDetalleProductos(id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/productos/'+id);

  }

  getTopProductos(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/productos/top');
  }

  getProductosDestacados(filterObject?: any): Observable<any>{
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
    return this.httpClient.get(this.baseUrl+`/productos/destacados${queryString}`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getMarcas(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/marcas')
  }

  getCategorias(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/categorias')

  }

  getCategoriasDestacados():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/categorias/destacados')
  }

  getTiposCategoria(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/tipos')
  }

  getBanners():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/banners');
  }
  getInformaciones(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/informaciones')
  }
  getInformacionesId(id:any): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/informaciones/'+id)
  }

  getTipoBlog(id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/tipoblogs/'+id)
  }

  getTiposBlogId(id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/blogs/'+id)
  }

  getVideos():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/videos');
  }

  websitePedido(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/pedido',data)
  }

  getBusquedaPedido(filterObject?: any): Observable<any>{
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
    return this.httpClient.get(this.baseUrl+`/pedido${queryString}`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  postPedidoComprobante(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/pedido/subida',data);
  }

}
