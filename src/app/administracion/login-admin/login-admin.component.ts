import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare var $;

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  public myForm: FormGroup;
  public visible: boolean = false;
  public mensaje: string = "";
  public arreglousuarios:any = [];
  public botonDesabilitado:boolean = true;
  public indexGlobal;
  constructor(public loginPrd: LoginService,
    public formBuilder: FormBuilder,public usuariosPrd:UsuariosService) {

  }

  ngOnInit() {
    this.myForm = this.createMyForm();
    this.usuariosPrd.obtenerAll().subscribe(datos =>{
      this.arreglousuarios = datos;
      for(let item of this.arreglousuarios){
           item.seleccionado = false;
      }
    });
  }

  public createMyForm() {
    return this.formBuilder.group({
      usuario: [''],
      password: ['', Validators.required]
    });
  }
  public enviarformulario(): any {
    let obj = this.myForm.value;
    let enviar = {
      usuario: this.arreglousuarios[this.indexGlobal].usuario,
      password: obj.password
    }
    
    this.loginPrd.ingresarSistema(enviar).subscribe(datos => {
      console.log("Entra adentor del suscribe");
        this.visible = false;
       
        this.loginPrd.guardarusuario(datos,true);
        this.usuariosPrd.setUsuario(datos);
        alert("ingresando al sistema");
        window.location.href = "/";
      
    }, erro => {
      this.visible = true;
      this.mensaje = "USUARIO Y/O CONTRASEÑA INVALIDOS";
      this.loginPrd.guardarusuario("",false);
      this.usuariosPrd.setUsuario(undefined);
    });

  }

  public elegirUsuario() {
    console.log("ELEGIR EL USUARIO");
     $("#myModal").modal('show');

  }

  public seleccionandoC(indice){
      for(let item of this.arreglousuarios)
            item.seleccionado = false;

            this.arreglousuarios[indice].seleccionado = true;

            this.botonDesabilitado = false;
            this.indexGlobal = indice;
  }

  public btnSeleccionando(nombreusuario){
      nombreusuario.value = this.arreglousuarios[this.indexGlobal].usuario;
      $("#myModal").modal('hide');
  }
}
