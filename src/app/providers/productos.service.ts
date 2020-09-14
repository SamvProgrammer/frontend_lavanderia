import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { direcciones } from '../direcciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: string = "";
  constructor(public http: HttpClient) {
    this.url = direcciones.productos;
  }

  public getAll(): Observable<any> {
    return this.http.get(this.url);
  }
  public getAllPagination(pagina:number): Observable<any> {
    return this.http.get(`${this.url}/paginacion?pagina=${pagina}`);
  }


  public get(identificador):Observable<any> {
      return this.http.get(`${this.url}/${identificador}`);
  }

  public insert(obj): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.url,json,httpOptions);
  }

  public update(obj):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.put(this.url,json,httpOptions);
  }
  public delete(identificador):Observable<any> {
     return this.http.delete(`${this.url}/${identificador}`);
  }
}
