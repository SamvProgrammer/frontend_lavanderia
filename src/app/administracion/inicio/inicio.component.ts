import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';

declare var alertify;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usuario ={

    usuario:'',apellido:'',nombre:'',id:0

  };


  constructor(private usuariosPrd:UsuariosService) { }

  ngOnInit() {

    console.log(this.usuariosPrd.getUsuario());
    this.usuario = this.usuariosPrd.getUsuario();
  }

  public cambiarContrase(contra,nuevo,nuevo2){

  
   let usuario = this.usuario;

    let usuariosPrd = this.usuariosPrd;


    alertify.confirm("¿Desea cambiar la contraseña?", function (e) {
      if (e) {       
        if(nuevo.value != nuevo2.value){
          alertify.error("La contraseña no concide");
          return;
    
        }

        usuariosPrd.validarPs(usuario.id,contra.value,nuevo.value).subscribe(datos =>{
          if(datos){
            alertify.success("Contraseña cambiada");
          }else{
            alertify.error("La contraseña anterior no concide");
          }
        });
      }
    });

  }

}
