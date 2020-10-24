import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../providers/categorias.service';
import { SucursalesService } from '../../providers/sucursales.service';

declare var $;
declare var alertify: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public myForm: FormGroup;
  public ingresar: boolean = false;
  public arreglo: any = [];
  public indice: number = 0;
  public productos: any = [];
  public arregloSucursal: any = [];
  public objDefault = {
    sucursales:{
      id:0
    }
  }

  constructor(public formBuilder: FormBuilder, public categoriasPrd: CategoriasService, private sucursalesPrd: SucursalesService) {

  }

  ngOnInit() {

    this.categoriasPrd.getAll().subscribe(datos => {
      this.arreglo = datos;
    });

    this.sucursalesPrd.getAll().subscribe(datos => {
      this.arregloSucursal = datos;
    });




    this.myForm = this.createMyForm(this.objDefault);

   
  }

  public createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      id_sucursal: [obj.sucursales.id, Validators.required],
      id: obj.id
    });
  }


  public abrir(obj, index): any {
    this.productos = [];
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar categoria");
      this.myForm = this.createMyForm(this.objDefault);
      this.ingresar = true;
    } else {
      this.productos = obj.productos;
      $("#titulo").text("Actualizar categoria");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
      this.indice = index;
    }
  }


  public eliminar(id, index): any {
    let auxSucursales: any = this.categoriasPrd;
    let arregloAux = this.arreglo;
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {

        auxSucursales.delete(id).subscribe(respu => {
          arregloAux.splice(index, 1);
          alertify.success(respu.resultado);
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
  }


  public enviarformulario(): any {
    let obj = this.myForm.value;


    obj.sucursales = {
      id:obj.id_sucursal
    }

    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.categoriasPrd.insert(obj).subscribe(datos => {
        alertify.success("Categoría agregada correctamente");
        this.arreglo.push(datos);

      });
    } else {
      this.categoriasPrd.update(obj).subscribe(datos => {
        alertify.success("Categoría actualizada correctamente");
        this.arreglo.splice(this.indice, 1, datos);
      });
    }
  }







}
