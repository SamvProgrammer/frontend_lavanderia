import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../providers/servicios.service';

@Component({
  selector: 'app-agregafichas',
  templateUrl: './agregafichas.component.html',
  styleUrls: ['./agregafichas.component.css']
})
export class AgregafichasComponent implements OnInit {


  public fechaa;
  public arreglo: any =[];

  constructor(private ventasPrd:ServiciosService) { }

  ngOnInit() {
  }


  public buscar(){

    let obj = {
      fecha: this.fechaa,
      cobrado: true
    };
    this.ventasPrd.getCobradosFecha(obj).subscribe(datos =>{
        this.arreglo = datos;
        console.log(this.arreglo);
    });
  }

}
