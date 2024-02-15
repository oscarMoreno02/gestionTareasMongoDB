import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      console.log('llega interceptor')
      let peticion = request.clone()
        let t=sessionStorage.getItem('token')
          if(t){
            peticion = request.clone({
              headers : request.headers.set('x-token',t)
            })
          }
      
      
        return next.handle(peticion);
    }
}