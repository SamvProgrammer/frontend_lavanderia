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
  

  constructor(public http: HttpClient) {
    this.url = direcciones.usuarios;
  }

  public obtenerAll():Observable<any>{
      return this.http.get(this.url);
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
    console.log('actualiza');
    console.log(json);
    return this.http.put(this.url,json,httpOptions);
  }
    public eliminar(id):Observable<any>{
      let direccion = this.url+"/"+id;
      return this.http.delete(direccion);
  }

  public getUsuario(){
    return this.usuario;
  }

  public setUsuario(obj){
    this.usuario = obj;
  }

}
