import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';
import { LoginService } from '../../providers/login.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {

  public nombre:string = "";
  public usuario:string = "";

  constructor(public usuariosPrd:UsuariosService,public loginPrd:LoginService) { }

  ngOnInit() {
      let obj = this.usuariosPrd.getUsuario();
      this.nombre = obj.nombre;
      this.usuario = obj.usuario;
      $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      if(localStorage["abrirPanel"] == "true"){
          this.mostrar();
      }else{
        this.cerrar();
      }
  }

  public cerrarSesion(){
    let obj = {
      usuario : '',
      nombre:'',
      id_rol:''
    }
    this.usuariosPrd.setUsuario(undefined);
    this.loginPrd.guardarusuario("",false);

    alert("Cerrando sesión");
    window.location.href = '/';
  }

  public cerrar():any{
    
    $(".page-wrapper").removeClass("toggled");

    localStorage["abrirPanel"] = "false";

  }

  public mostrar():any{
    $(".page-wrapper").addClass("toggled");
    localStorage["abrirPanel"] = "true";
  }

}
