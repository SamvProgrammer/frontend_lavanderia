import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalesService } from '../../providers/sucursales.service';
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

  public objDefault = {
    sucursales:{
      id:0
    }
  }


  constructor(public usuarioPrd: UsuariosService,
    public formBuilder: FormBuilder,private sucursalesPrd:SucursalesService) {
    localStorage["actualizar"] = false;
  }

  ngOnInit() {
    this.usuarioPrd.obtenerAll().subscribe(datos => {
      this.arreglo = datos;
      console.log(datos);
    });

    

    this.sucursalesPrd.getAll().subscribe(datos =>{
        this.arregloSucursal = datos;
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
      id_sucursal:[obj.sucursales.id_sucursal,Validators.required]
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;

   
    $('#myModal').modal('hide');
    if (this.ingresar) {
      console.log('inserta');
      console.log(obj);
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
    console.log('modifica');
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

