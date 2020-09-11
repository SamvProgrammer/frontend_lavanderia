import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-movimientos-inventario',
  templateUrl: './movimientos-inventario.component.html',
  styleUrls: ['./movimientos-inventario.component.css']
})
export class MovimientosInventarioComponent implements OnInit {

  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;


  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  }


  public abrir(obj): any {
    console.log('modifica');
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar producto");

      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar proveedor");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
    }
  }



  public createMyForm(obj) {
    return this.formBuilder.group({
      nombrecompania: [obj.nombrecompania, Validators.required],
      id: obj.id
    });
  }


  
  public abrirProductos(){
      $("#myModalProductos").modal('show')
  }

  public recibirProducto(producto){
    console.log("Esto traigo de este lado");
    console.log(producto.nombre);
    console.log(producto.unidadmedida.descripcion);
    $("#myModalProductos").modal('hide')
  }
               


}