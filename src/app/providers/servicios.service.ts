import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public url: string = "";
  constructor(public http: HttpClient) {
    this.url = direcciones.ventas;
  }

  public realizarVenta(obj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.url,json,httpOptions);
  }

  public getVentas(cobrado:boolean):Observable<any>{
   return this.http.get(`${this.url}?cobrado=${cobrado}`);
  }
}
