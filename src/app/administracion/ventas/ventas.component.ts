import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';
import { ServiciosService } from '../../providers/servicios.service';

declare var $;
declare var alertify: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild("nombrecliente") nombreClienteId: ElementRef;
  @ViewChild("apellidocliente") apellidoClienteId: ElementRef;
  @ViewChild("objValorService") objValorService: ElementRef;
  @ViewChild("objDateEntrega") objDateEntrega: ElementRef;
  @ViewChild("objTimeEntrega") objTimeEntrega: ElementRef;
  @ViewChild("checkUser") checkUser: ElementRef;
  @ViewChild("id_cliente") id_cliente: ElementRef;

  public usuarios;
  public clientebool: boolean = false;
  public valorservicio: boolean = false;
  public arregloProductos: any = [];
  public desabilitar:boolean = false;
  public indexSeleccionado;
  public venta = {
    generarServicio: undefined,
    idcliente: undefined,
    fecha: new Date().toLocaleDateString(),
    tipoServicio: undefined,
    idsucursal: undefined,
    fechaentrega: undefined,
    hora: undefined,
    idempleado: undefined,
    idservicio: 0

  }

  public arregloVentas:any = [];
  public conventa: any = {
    conventa: false
  };
  constructor(public usuariosPrd: UsuariosService, private serviciosPrd: ServiciosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosPrd.getUsuario();
    this.serviciosPrd.getVentas(false).subscribe(datos =>{
      console.log("Esto es lpo que trae2");
      console.log(datos);
      this.arregloVentas = datos;
      if(this.arregloVentas.length > 1){
       $('#myModalVentas').modal('show');
      }
    });
  }

  public abriClientes() {
    $('#myModalclientees').modal('show');

  }

  public recibir($evento) {
    $('#myModalclientees').modal('hide');
    this.nombreClienteId.nativeElement.value = $evento.nombre;
    this.apellidoClienteId.nativeElement.value = $evento.apellido;
    this.id_cliente.nativeElement.value = $evento.id;
  }


  public abrir() {
    $('#myModalProductos').modal('show');
  }

  public recibirProducto($evento) {
    $('#myModalProductos').modal('hide');
    this.arregloProductos.push($evento);
  }


  public generarServicio() {
    //alertify.error('Error, falta datos que rellenar');
    let conventa1 = this.conventa;
    let venta = this.venta;
    let objValorService = this.objValorService;
    let objTimeEntrega = this.objTimeEntrega;
    let objDateEntrega = this.objDateEntrega;
    let usuarios = this.usuarios;
    let checkUser = this.checkUser;
    let id_cliente = this.id_cliente;
    let serviciosPrd = this.serviciosPrd;

    alertify.confirm("¿Desea generar un nuevo servicio?", function (e) {
      if (e) {

        if (objValorService.nativeElement.value == "false") {

          if (objDateEntrega.nativeElement.value == "") {
            alertify.error("No se ha asignado fecha de entrega para servicio por encargo");
            return;
          } else if (objTimeEntrega.nativeElement.value == "") {
            alertify.error("No se ha asignado hora de entrega para servicio por encargo");
            return;
          }
        }



        if (checkUser.nativeElement.checked) {
          if (id_cliente.nativeElement.value == "") {
            alertify.error("No se ha seleccionado el cliente");
            return;
          }
        }

        venta.fecha = new Date().toLocaleDateString();
        if (objDateEntrega != undefined) {
          venta.fechaentrega = objDateEntrega.nativeElement.value;
        }
        if (objTimeEntrega != undefined) {
          venta.hora = objTimeEntrega.nativeElement.value;
        }

        if (id_cliente != undefined) {
          venta.idcliente = id_cliente.nativeElement.value;
        }

        venta.tipoServicio = objValorService.nativeElement.value == "true" ? 1 : 2;
        venta.idempleado = usuarios.id;

        serviciosPrd.realizarVenta(venta).subscribe(datos => {
          venta.idservicio = datos.idservicio;
          alertify.success("El servicio esta generado, favor de ingresar los produtos correspondientes y cerrar el ticket");
          conventa1.conventa = true;
        }, err => {
          alertify.error("Error al generar el ticket de compra");
        });


      }
    });

  }

  public seleccionar(item,indice){
    for(let aux of this.arregloVentas)
    aux.seleccionado = false;

this.arregloVentas[indice].seleccionado = true;
    this.desabilitar = false;
    this.indexSeleccionado = indice;
  }


  public seleccionarItem(){
    let item = this.arregloVentas[this.indexSeleccionado];
    console.log(item);
    $('#myModalVentas').modal('hide');
  }



}
