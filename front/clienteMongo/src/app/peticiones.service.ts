import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http:HttpClient) { }
  login(email:string,password:string): Observable<any | undefined> {
   let body={email:email,password:password}
    return this.http.put<any>('http://localhost:9090/api/login',body)
  }

}
