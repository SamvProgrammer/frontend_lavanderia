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
  @ViewChild("objValorService") objValorService:ElementRef;
  @ViewChild("objDateEntrega") objDateEntrega:ElementRef;
  @ViewChild("objTimeEntrega") objTimeEntrega:ElementRef;
  @ViewChild("checkUser") checkUser:ElementRef;
  @ViewChild("id_cliente") id_cliente:ElementRef;
public usuarios;
public clientebool:boolean = false;
public valorservicio:boolean = false;
public arregloProductos:any = [];
public venta = {
  generarServicio:undefined,
  idcliente:undefined,
  fecha:undefined,
  tipoServicio:undefined,
  idsucursal:undefined,
  fechaentrega:undefined,
  hora:undefined,
  idempleado:undefined
}
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
    this.id_cliente.nativeElement.value = $evento.id;
  }


  public abrir(){
    $('#myModalProductos').modal('show');
  }

  public recibirProducto($evento){
    $('#myModalProductos').modal('hide');
    this.arregloProductos.push($evento);
  }


  public generarServicio(){
    //alertify.error('Error, falta datos que rellenar');
    let conventa1 = this.conventa;
    let venta = this.venta;
    let objValorService = this.objValorService;
    let objTimeEntrega = this.objTimeEntrega;
    let objDateEntrega = this.objDateEntrega;
    let usuarios = this.usuarios;
    let checkUser = this.checkUser;
    let id_cliente = this.id_cliente;
    alertify.confirm("¿Desea generar un nuevo servicio?", function (e) {
      if (e) {

              if(objValorService.nativeElement.value == "false"){
         
           if(objDateEntrega.nativeElement.value == ""){
            alertify.error("Servicio de entrega no se a asignado fecha de entrega");
            return;
           }else if(objTimeEntrega.nativeElement.value == ""){
            alertify.error("Servicio de entrega no se a asignado hora de entrega");
            return;
           }
        }
         
      

        if(checkUser.nativeElement.checked){
          if(id_cliente.nativeElement.value == ""){            
            alertify.error("No se ha seleccionado el cliente");
            return;
          }
        }

        conventa1.conventa = true;
        alertify.success("El servicio esta generado, favor de ingresar los produtos correspondientes y cerrar el ticket");
        venta.fecha = new Date();
        if(objDateEntrega != undefined){
          venta.fechaentrega = objDateEntrega.nativeElement.value;
        }
        if(objTimeEntrega != undefined){
          venta.hora = objTimeEntrega.nativeElement.value;
        }
        venta.tipoServicio = objValorService.nativeElement.value ? 1 : 2;
        venta.idempleado = usuarios.id;
        

      }
    });
  
  }

  

}
