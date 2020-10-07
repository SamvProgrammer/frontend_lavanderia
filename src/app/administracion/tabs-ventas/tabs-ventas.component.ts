import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionComponent } from '../transaccion/transaccion.component';

@Component({
  selector: 'app-tabs-ventas',
  templateUrl: './tabs-ventas.component.html',
  styleUrls: ['./tabs-ventas.component.css']
})
export class TabsVentasComponent implements OnInit {

  @ViewChild(TransaccionComponent) elemento: TransaccionComponent;

  constructor() { }

  ngOnInit() {
  }


  public traerTransaccion(){
    console.log("trae trancaccon");
    this.elemento.traerCobrados();
  }

}
