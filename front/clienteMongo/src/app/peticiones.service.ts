import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http:HttpClient) { }
  login(body:any): Observable<any | undefined> {
 
    return this.http.put<any>('http://localhost:9090/api/login',body)
  }
  peticionPost(url:string,body:any): Observable<any | undefined> {
      return this.http.post<any>(url,body)
    }
    peticionPut(url:string,body:any,id:number): Observable<any | undefined> {
      return this.http.put<any>(url+'/'+id,body,{params:{auth:true}})
    }
    peticionGet(url:string,id:number |null): Observable<any | undefined> {
      if(id==null){
        return this.http.get<any>(url,{params:{auth:true}})
      }else{
        return this.http.get<any>(url+'/'+id,{params:{auth:true}})
      }
    }
    peticionDelete(url:string,id:number): Observable<any | undefined> {
      return this.http.delete<any>(url+'/'+id,{params:{auth:true}})
    }
}
