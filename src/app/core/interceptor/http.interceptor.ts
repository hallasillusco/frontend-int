import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor as NgHttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor implements NgHttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si la URL ya empieza con http(s), no modificarla
    const isAbsoluteURL = request.url.startsWith('http://') || request.url.startsWith('https://');

    const modifiedRequest = request.clone({
      url: isAbsoluteURL ? request.url : `${environment.apiUrl}${request.url}`
    });

    return next.handle(modifiedRequest);
  }
}
