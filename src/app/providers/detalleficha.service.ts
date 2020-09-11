import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';
import { R3BoundTarget } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DetallefichaService {
  public url: string = "";

  constructor(public http: HttpClient) {
    this.url = direcciones.fichas;
  }

  public getAll(): Observable<any> {
    return this.http.get(this.url);
  }


  public get(identificador): Observable<any> {
    return this.http.get(`${this.url}/${identificador}`);
  }




  public getDetalle(idsucursal, tipo_servicio, empleado, desde, hasta): Observable<any> {
    let ruta = `${this.url}/${desde}/${hasta}/${idsucursal}/${tipo_servicio}/${empleado} `;
    return this.http.get(ruta);
  }


  public SumaDetalle(idsucursal, tipo_servicio, empleado, desde, hasta): Observable<any> {
    let ruta = `${this.url}/sumafichas/${desde}/${hasta}/${idsucursal}/${tipo_servicio}/${empleado} `;
    return this.http.get(ruta);
  }


  public insert(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.url, json, httpOptions);
  }





  public update(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.put(this.url, json, httpOptions);
  }
  public delete(identificador): Observable<any> {
    return this.http.delete(`${this.url}/${identificador}`);
  }
}
