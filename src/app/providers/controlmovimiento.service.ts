import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlmovimientoService {

  public url: string = "";
  public url1: string = "";

  constructor(public http: HttpClient) {
    this.url = direcciones.inventario;
    this.url1 = direcciones.reportes;
  }



  public insert(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.url + "/movimientos", obj, httpOptions);
  }


  public insertCortePrimero(sucursal, id_user): Observable<any> {
    return this.http.get(this.url + "/corteinicial/" + sucursal + "/" + id_user);
  }


  public CorteXsucursal(id_sucursal , id_usuario): Observable<any> {
    return this.http.get(this.url1 + "/corte/" + id_sucursal +"/"+id_usuario+ "/pdf");
  }





}
