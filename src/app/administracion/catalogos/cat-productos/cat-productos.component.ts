import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProductosService } from '../../../providers/productos.service';

@Component({
  selector: 'app-cat-productos',
  templateUrl: './cat-productos.component.html',
  styleUrls: ['./cat-productos.component.css']
})
export class CatProductosComponent implements OnInit {

  @Output() eventoFunciones = new EventEmitter();
  public arreglo:any = [];
  public desabilitar:boolean = true;
  public indexSeleccionado:number = 0;
  constructor(public productosPrd:ProductosService) { }

  ngOnInit() {

    this.productosPrd.getAll().subscribe(datos =>{
      this.arreglo = datos;
    });


   

  }

  public seleccionar(item,indice){
      for(let aux of this.arreglo)
          aux.seleccionado = false;

      this.arreglo[indice].seleccionado = true;
      this.desabilitar = false;
      this.indexSeleccionado = indice;
  }


  public seleccionarItem(){
    let item = this.arreglo[this.indexSeleccionado];
       this.eventoFunciones.emit(item);

       

  }

}
