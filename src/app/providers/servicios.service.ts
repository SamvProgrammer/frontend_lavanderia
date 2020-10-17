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

  public insertarDetalleServicio(obj):Observable<any>{
     const httpOptions = {
       headers:new HttpHeaders({
         'Content-Type':'application/json'
       })
     };
     let json = JSON.stringify(obj);
     return this.http.post(`${this.url}/detalleservicio`,json,httpOptions)
  }

  public getDetalleServicio(id_servicio):Observable<any>{
     return this.http.get(`${this.url}/detalleservicio/${id_servicio}`);
  }

  public eliminarDetalleServicio(id_detalle):Observable<any>{
    return this.http.delete(`${this.url}/detalleservicio/${id_detalle}`);
 }

  public actualizarDetalle(obj):Observable<any>{
    let dire = direcciones.serviciosdetalles;
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    let json = JSON.stringify(obj);
    return this.http.put(`${dire}`,json,httpOptions)
  }

  public getCobradosFecha(obj):Observable<any>{
    let dire = `${this.url}//cobrados?cobrado=${obj.cobrado}&fecha=${obj.fecha}`;
    return this.http.get(dire);
  }
}
