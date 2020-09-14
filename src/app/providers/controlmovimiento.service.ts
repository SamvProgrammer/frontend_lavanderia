import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlmovimientoService {

  public url: string = "";
  constructor(public http: HttpClient) {
    this.url = direcciones.inventario;
  }



  public insert(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.url +"/lista", json, httpOptions);
  }

}
