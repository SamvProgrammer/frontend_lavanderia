import { Component } from '@angular/core';
import { LoginService } from './providers/login.service';
import { UsuariosService } from './providers/usuarios.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LAVAMAX';

  constructor(public loginPrd:LoginService,public usuariosPrd:UsuariosService){
    let usuarioStr = localStorage["usuario"];
  
    if(usuarioStr != undefined){
      let usuarioObj = JSON.parse(usuarioStr);

      this.usuariosPrd.setUsuario(usuarioObj);
 
    }else{
      this.usuariosPrd.setUsuario(undefined);
    }
  }

  public mostrar():boolean{
    return this.loginPrd.mostrarMenu();
  }
}
