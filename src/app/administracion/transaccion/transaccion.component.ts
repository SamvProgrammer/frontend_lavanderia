import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../providers/servicios.service';

declare var $;

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  public arreglocobrados:any = []; 
  public venta = {
    cliente:undefined
  };

  constructor(private serviciosPrd:ServiciosService) { }

  ngOnInit() {
    this.traerCobrados();
  }

  public traerCobrados() {
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let obj = {
      fecha: `${ye}-${mo}-${da}`,
      cobrado: true
    };
    console.log(obj);
    this.serviciosPrd.getCobradosFecha(obj).subscribe(datos => {
      for(let item of datos){
        if(!item.cancelado)
          item.imagen = '../../../assets/img/cobrado.png';
        else
          item.imagen = '../../../assets/img/cancelar.png';
        
          item.seleccionado = false;
      }

      this.arreglocobrados = datos;
      console.log(this.arreglocobrados);
      console.log("el arreglo");
    });
  }


  public seleccionandoitem(item){
    for(let item of this.arreglocobrados)
       item.seleccionado = false;
     item.seleccionado = true;
  }

  public abriritem(item){
    $('#modalreview').modal('show');
    this.venta = item;
    console.log(this.venta);
  }

}
