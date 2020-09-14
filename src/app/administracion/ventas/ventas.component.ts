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


  public usuarios;
  public arregloProductos: any = [];
  public desabilitar: boolean = false;
  public indexSeleccionado;
  public venta = {
    generarServicio: undefined,
    fecha: new Date(),
    tipoServicio: undefined,
    idsucursal: undefined,
    fechaentrega: undefined,
    hora: undefined,
    idempleado: undefined,
    idservicio: 0,
    cliente: {
      id: undefined,
      nombre: "",
      apellido: "",
      direccion: ""
    },
    valorservicio: "false",
    checkUser: false,
    checkUserTemp:false,
    nombreClienteTemp:"",
    direccionClienteTemp:""
  }

  public arregloVentas: any = [];
  public conventa: any = {
    conventa: false
  };
  constructor(public usuariosPrd: UsuariosService, private serviciosPrd: ServiciosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosPrd.getUsuario();
    this.serviciosPrd.getVentas(false).subscribe(datos => {
      this.arregloVentas = datos;
      if (this.arregloVentas.length > 1) {
        $('#myModalVentas').modal('show');
        
      } else if (this.arregloVentas.length == 1) {
        this.venta = this.arregloVentas[0];
        this.venta.valorservicio = this.venta.tipoServicio == 1 ? "true" : "false";
        this.conventa.conventa = true;
        if (this.venta.cliente != null || this.venta.cliente != null) {
          this.venta.checkUser = true;
        }
        if(this.venta.nombreClienteTemp != ""){
           this.venta.checkUser = true;
           this.venta.checkUserTemp = true;
        }
      }
    });
  }

  public abriClientes() {
    $('#myModalclientees').modal('show');

  }

  public recibir($evento) {
    $('#myModalclientees').modal('hide');


    this.venta.cliente.id = $evento.id;
    this.venta.cliente.nombre = $evento.nombre + " " + $evento.apellido;
    this.venta.cliente.direccion = $evento.direccion;

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
    let usuarios = this.usuarios;
    let serviciosPrd = this.serviciosPrd;

    alertify.confirm("¿Desea generar un nuevo servicio?", function (e) {
      if (e) {

        if (venta.valorservicio == "false") {

         

          if (venta.fechaentrega == undefined) {
            alertify.error("No se ha asignado fecha de entrega para servicio por encargo");
            return;
          } else if (venta.hora == undefined) {
            alertify.error("No se ha asignado hora de entrega para servicio por encargo");
            return;
          }
        }

        if (venta.checkUser) {
         if(!venta.checkUserTemp){
          if (venta.cliente.id == 0 || venta.cliente == undefined || venta.cliente == null || venta.cliente.id == undefined) {
            alertify.error("No se ha seleccionado el cliente");
            return;
          }
         }else{
           
           venta.cliente = undefined;
         }
        } else {
          venta.cliente = undefined;
        }

        venta.fecha = new Date();

        venta.tipoServicio = venta.valorservicio != "true" ? 1 : 2;
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

  public seleccionar(item, indice) {
    for (let aux of this.arregloVentas)
      aux.seleccionado = false;

    this.arregloVentas[indice].seleccionado = true;
    this.desabilitar = false;
    this.indexSeleccionado = indice;
  }


  public seleccionarItem() {
    let item = this.arregloVentas[this.indexSeleccionado];
    $('#myModalVentas').modal('hide');
    this.venta = item;
    this.conventa.conventa = true;
    this.venta.valorservicio = this.venta.tipoServicio != 1 ? "true" : "false";
    if (this.venta.cliente != null || this.venta.cliente != null) {
      this.venta.checkUser = true;
    }
    
    
    if(this.venta.nombreClienteTemp != ""){
      this.venta.checkUser = true;
      this.venta.checkUserTemp = true;
   }
  }

  public nuevoTicket() {
    let venta = this.venta;
    let conventa = this.conventa;
    alertify.confirm("¿Desea crear un nuevo ticket?", function (e) {
      if (e) {

        for(let llave in venta){
          venta[llave] = undefined;
      }

        venta.cliente = {
          id: undefined,
          apellido: "",
          direccion: "",
          nombre: ""
        }
        conventa.conventa = false;
        venta.fechaentrega = undefined;
        venta.hora = undefined;
        venta.checkUser = false;
        venta.checkUserTemp = false;
        venta.nombreClienteTemp = "";
        venta.direccionClienteTemp = "";
        venta.idservicio = 0;
        venta.fecha = new Date();
        venta.valorservicio = "true";
       
      }
    });
  }

  public cancelarTicket(){
    alertify.confirm("¿Desea cancelar el ticket?", function (e) {
      if (e) {
        alertify.success("Ticket cancelado correctamente");
      }});
  }

  public visualizarTickets(){
    $('#myModalVentas').modal('show');
  }

}
