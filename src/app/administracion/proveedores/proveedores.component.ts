import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../providers/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;

  constructor(public proveedoresPrd: ProveedoresService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.proveedoresPrd.getAll().subscribe(datos => {
      this.arreglo = datos;
    });

    this.myForm = this.createMyForm("");
  }


  public createMyForm(obj) {
    return this.formBuilder.group({
      nombrecompania: [obj.nombrecompania, Validators.required],
      nombre: [obj.nombre, Validators.required],
      ciudad: [obj.ciudad, Validators.required],
      codigopostal: [obj.codigopostal, Validators.required],
      direccion: [obj.ciudad, Validators.required],
      estado: [obj.estado, Validators.required],
      rfc: [obj.codigopostal, Validators.required],
      telefono: [obj.telefono, Validators.required],

      id: obj.id
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;


    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.proveedoresPrd.insert(obj).subscribe(datos => {
        alertify.success('REGISTRO INSERTADO');
        this.ngOnInit();

      });
    } else {
      this.proveedoresPrd.update(obj).subscribe(datos => {
        alertify.success('REGISTRO ACTUALIZADO');
        this.ngOnInit();
      });
    }
  }


  public eliminar(id): any {
    let clientePrdVar = this.proveedoresPrd;

    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {
        clientePrdVar.delete(id).subscribe(respu => {
          alertify.success(respu.respuesta);
          localStorage["actualizar"] = true;
        },err =>{
          let mensaje:string = err.error.message;
          if(mensaje.includes("ConstraintViolationException")){
            alertify.error("No se puede eliminar el registro porque contiene elementos asociados.");

          }else{
            alertify.error(mensaje);
          }
        });
      }
    });


    this.actualizandoArreglo();


  }


  public actualizandoArreglo() {

    setTimeout(() => {
      if (localStorage["actualizar"] == "true") {
        localStorage["actualizar"] = false;
        this.proveedoresPrd.getAll().subscribe(datos => {
          this.arreglo = datos;
        });
      } else {
        this.actualizandoArreglo();
      }
    }, 500);
  }

  public abrir(obj): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar proveedor");

      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar proveedor");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
    }
  }



}
