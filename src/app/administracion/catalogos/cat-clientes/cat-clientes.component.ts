import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { ClienteservService } from '../../../providers/clienteserv.service';

@Component({
  selector: 'app-cat-clientes',
  templateUrl: './cat-clientes.component.html',
  styleUrls: ['./cat-clientes.component.css']
})
export class CatClientesComponent implements OnInit {
  @Output() eventoFunciones = new EventEmitter();
  public arreglo:any = [];
  public desabilitar:boolean = true;
  public indexSeleccionado:number = 0;
  constructor(public clientesPrd:ClienteservService) { }

  ngOnInit() {

    this.clientesPrd.getAll().subscribe(datos =>{
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
