import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string = "";
  

  constructor(public http: HttpClient,public usuariosPrd:UsuariosService) {
    this.url = direcciones.login;
  }


  public ingresarSistema(obj):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);

    let direccion = this.url;
    return this.http.post(direccion,json,httpOptions);

  }

  public guardarusuario(obj,logeado){
    let objGuardar =  JSON.stringify(obj);
    localStorage["usuario"] = objGuardar;
    localStorage["logeado"] = logeado;
  }
  public getUsuario():any{
    let obj = {
       usuario:localStorage["usuario"],
       id_rol:localStorage["id_rol"],
       nombre:localStorage["nombre"]
    }
  return obj;}


  public mostrarMenu():boolean{
    return localStorage["logeado"] == "true";
  }


  

  


}
