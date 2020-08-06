import { Component, OnInit } from '@angular/core';
declare var $;
declare var alertify: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public abrir(obj,index): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar Producto");
     
    } else {
      $("#titulo").text("Actualizar Sucursal");
    }
  }


  public abrirModalMediada(obj,index){
    $('#myModalProducto').modal('show');
    if (obj == undefined) {
      $("#tituloProducto").text("Ingresar Producto");
     
    } else {
      $("#tituloProducto").text("Actualizar Sucursal");
    }
  }


  public abrirClasificacion(){
     alert("se abre");
  }

}
