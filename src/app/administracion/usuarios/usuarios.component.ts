import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalesService } from '../../providers/sucursales.service';
import { RolesService } from '../../providers/roles.service';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;
  public arregloSucursal:any = [];
  public arregloRoles:any = [];

  public objDefault = {
    sucursales:{
      id:0
    },
    roles:{
      id:0
    }
  }


  constructor(public usuarioPrd: UsuariosService,
    public formBuilder: FormBuilder,private sucursalesPrd:SucursalesService,private rolesPrd:RolesService) {
    localStorage["actualizar"] = false;
  }

  ngOnInit() {
    this.usuarioPrd.obtenerAll().subscribe(datos => {
      this.arreglo = datos;
    });

    

    this.sucursalesPrd.getAll().subscribe(datos =>{
        this.arregloSucursal = datos;
    });

    this.rolesPrd.getAll().subscribe(datos =>{
      this.arregloRoles = datos;
    });

    this.myForm = this.createMyForm(this.objDefault);
  }


  public createMyForm(obj) {
    return this.formBuilder.group({
      usuario: [obj.usuario, Validators.required],
      nombre: [obj.nombre, Validators.required],
      apellido: [obj.apellido, Validators.required],
      password: [obj.password, Validators.required],
      ciudad: [obj.ciudad, Validators.required],
      codigopostal: [obj.codigopostal, Validators.required],
      direccion: [obj.direccion, Validators.required],
      activo: [obj.activo , Validators.required],
      estado: [obj.estado , Validators.required],
      id: obj.id,
      id_sucursal:[obj.sucursales.id,Validators.required],
      id_rol:[obj.roles.id,Validators.required]
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;

    obj.sucursales = {
      id : obj.id_sucursal
    }

    obj.roles = {
      id : obj.id_rol
    }
   
    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.usuarioPrd.insertar(obj).subscribe(datos => {
        alertify.success('REGISTRO INSERTADO');
        this.ngOnInit();

      });
    } else {
      this.usuarioPrd.actualizar(obj).subscribe(datos => {
        alertify.success('REGISTRO ACTUALIZADO');
        this.ngOnInit();
      });
    }
  }


  public eliminar(id , indice): any {
    let clientePrdVar = this.usuarioPrd;
    let arregloaux = this.arreglo;
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {
        clientePrdVar.eliminar(id).subscribe(respu => {
          alertify.success('REGISTRO ELIMINADO');
    arregloaux.splice(indice,1);
        });
      }
    });




  }

  public abrir(obj): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar Usuario");

      this.myForm = this.createMyForm(this.objDefault);
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar cliente");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
    }
  }



}

