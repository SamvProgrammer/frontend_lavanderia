import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public url: string = "";
  public usuario:any;
  public sucursal:any;

  constructor(public http: HttpClient) {
    this.url = direcciones.usuarios;
  }

  public obtenerAll():Observable<any>{
      return this.http.get(this.url);
  }
  public obtenerAllSucursal(id_sucursal):Observable<any>{
      return this.http.get(this.url+"?id_sucursal="+id_sucursal);
  }
  public insertar(obj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.url,json,httpOptions);
  }
  public actualizar(obj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.put(this.url,json,httpOptions);
  }
    public eliminar(id):Observable<any>{
      let direccion = this.url+"/"+id;
      return this.http.delete(direccion);
  }

  public validarPs(id,password,nuevo):Observable<any>{
   let validar =  `${ this.url}/${id}/${password}/${nuevo}`;
    
   return this.http.get(validar);

  }

  public getUsuario(){
    return this.usuario;
  }

  public setUsuario(obj){
    this.usuario = obj;
  }

  public setSucursal(obj){
    this.sucursal = obj;
  }

  public getSucursal(){
     return this.sucursal;
  }

}
