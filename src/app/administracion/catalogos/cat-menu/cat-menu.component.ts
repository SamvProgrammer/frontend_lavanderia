import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { RolesService } from '../../../providers/roles.service';

@Component({
  selector: 'app-cat-menu',
  templateUrl: './cat-menu.component.html',
  styleUrls: ['./cat-menu.component.css']
})
export class CatMenuComponent implements OnInit {
  @Output() eventoFunciones = new EventEmitter();
  public arreglo:any = [];
  public desabilitar:boolean = true;
  public indexSeleccionado:number = 0;
  constructor(public menuPrd:RolesService) { }

  ngOnInit() {

    this.menuPrd.getMenu().subscribe(datos =>{
      this.arreglo = datos;
      for(let aux of this.arreglo)
      aux.seleccionado = false;
    });


   

  }

  public seleccionar(item,indice){
    

      this.arreglo[indice].seleccionado = !this.arreglo[indice].seleccionado;
      this.desabilitar = false;
      this.indexSeleccionado = indice;
  }


  public seleccionarItem(){
    
    let arregloSeleccionado:any = [];
    for(let item of this.arreglo){
       if(item.seleccionado)
          arregloSeleccionado.push(item);
    }


       this.eventoFunciones.emit(arregloSeleccionado);

       

  }
}
