import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { CategoriasService } from '../../../providers/categorias.service';

@Component({
  selector: 'app-cat-categorias',
  templateUrl: './cat-categorias.component.html',
  styleUrls: ['./cat-categorias.component.css']
})
export class CatCategoriasComponent implements OnInit {
  @Output() eventoFunciones = new EventEmitter();
  public arreglo:any = [];
  public desabilitar:boolean = true;
  public indexSeleccionado:number = 0;
  constructor(public categoriasPrd:CategoriasService) { }

  ngOnInit() {

    this.categoriasPrd.getAll().subscribe(datos =>{
      this.arreglo = datos;

      console.log("Se ejecuta la tabla");
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
