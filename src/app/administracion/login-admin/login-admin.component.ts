import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  public myForm: FormGroup;
  public visible: boolean = false;
  private mensaje: string = "";
  constructor(private loginPrd: LoginService,
    public formBuilder: FormBuilder,private usuariosPrd:UsuariosService) {

  }

  ngOnInit() {
    this.myForm = this.createMyForm();
  }

  private createMyForm() {
    return this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public enviarformulario(): any {
    let obj = this.myForm.value;
    let enviar = {
      usuario: obj.usuario,
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

  public mostrarmodal(): any {
  }
}
