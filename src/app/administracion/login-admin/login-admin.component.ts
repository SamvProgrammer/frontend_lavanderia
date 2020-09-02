import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { SucursalesService } from '../../providers/sucursales.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare var $;

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  @ViewChild("nombrecontrol") campoUsuario:ElementRef
  public myForm: FormGroup;
  public visible: boolean = false;
  public mensaje: string = "";
  public arreglousuarios: any = [];
  public botonDesabilitado: boolean = true;
  public indexGlobal;
  public sucursales: any = [];
  public inicio: boolean = false;
  public sucursalSeleccionada: boolean = true;
  public indexSucursal;
  public sucursal;
  constructor(public loginPrd: LoginService,
    public formBuilder: FormBuilder, public usuariosPrd: UsuariosService, private sucursalesPrd: SucursalesService) {

  }

  ngOnInit() {
    this.myForm = this.createMyForm();
    this.sucursalesPrd.getAll().subscribe(datos => {
      this.sucursales = datos;
      for (let item of this.sucursales) {
        item.seleccionado = false;
      }
    });

    this.inicio = localStorage["paginainicio"] == "true";
    if(localStorage["sucursal"] != undefined){
        this.usuariosPrd.setSucursal(JSON.parse(localStorage["sucursal"]));
        this.sucursal = this.usuariosPrd.getSucursal();

        this.usuariosPrd.obtenerAllSucursal(this.sucursal.id).subscribe(datos => {
          this.arreglousuarios = datos;
          for (let item of this.arreglousuarios) {
            item.seleccionado = false;
          }
        });
    }
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

      this.loginPrd.guardarusuario(datos, true);
      this.usuariosPrd.setUsuario(datos);
      alert("ingresando al sistema");
      window.location.href = "/";

    }, erro => {
      this.visible = true;
      this.mensaje = "USUARIO Y/O CONTRASEÑA INVALIDOS";
      this.loginPrd.guardarusuario("", false);
      this.usuariosPrd.setUsuario(undefined);
    });

  }

  public elegirUsuario() {
    console.log("ELEGIR EL USUARIO");
    $("#myModal").modal('show');

  }

  public seleccionandoC(indice) {
    for (let item of this.arreglousuarios)
      item.seleccionado = false;

    this.arreglousuarios[indice].seleccionado = true;

    this.botonDesabilitado = false;
    this.indexGlobal = indice;
  }

  public btnSeleccionando(nombreusuario) {
    console.log(nombreusuario);
    this.campoUsuario.nativeElement.value = this.arreglousuarios[this.indexGlobal].usuario;
    $("#myModal").modal('hide');
  }



  public seleccionandoSucursal(indice) {
    for (let item of this.sucursales)
      item.seleccionado = false;

    this.sucursales[indice].seleccionado = true;

    this.sucursalSeleccionada = false;


    this.indexSucursal = indice;

  }

  public sucursalSeleccionadaBtn(){
    let slcSucursal = this.sucursales[this.indexSucursal];
    this.sucursal = slcSucursal;
    let objSucursal = JSON.stringify(slcSucursal);
    localStorage["sucursal"] = objSucursal;
    localStorage["paginainicio"] = true;
    this.inicio = true;

    this.usuariosPrd.obtenerAllSucursal(this.sucursal.id).subscribe(datos =>{
      this.arreglousuarios = datos;
    });
  }

}
