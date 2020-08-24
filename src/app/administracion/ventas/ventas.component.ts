import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';

declare var $;
declare var alertify: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild("nombrecliente") nombreClienteId:ElementRef;
  @ViewChild("apellidocliente") apellidoClienteId:ElementRef;
public usuarios;
public clientebool:boolean = false;
public valorservicio:boolean = false;
public arregloProductos:any = [];
public conventa:any = {
  conventa:false
};
  constructor(public usuariosPrd:UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosPrd.getUsuario();
    console.log(this.usuarios.usuario);
  }

  public abriClientes(){
    $('#myModalclientees').modal('show');

  }

  public recibir($evento){
    $('#myModalclientees').modal('hide');
    this.nombreClienteId.nativeElement.value = $evento.nombre;
    this.apellidoClienteId.nativeElement.value = $evento.apellido;
  }


  public abrir(){
    $('#myModalProductos').modal('show');
  }

  public recibirProducto($evento){
    $('#myModalProductos').modal('hide');
    this.arregloProductos.push($evento);
  }


  public generarServicio(){
    let conventa1 = this.conventa;
    alertify.confirm("¿Desea generar un nuevo servicio?", function (e) {
      console.log(this);
      if (e) {
        conventa1.conventa = true;
        alertify.success("El servicio esta generado, favor de ingresar los produtos correspondientes y cerrar el ticket");
      }
    });
  
  }

  

}
