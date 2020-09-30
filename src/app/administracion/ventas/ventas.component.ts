import { Component, OnInit } from '@angular/core';
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
    checkUserTemp: false,
    nombreClienteTemp: "",
    direccionClienteTemp: "",
    detalleServicio: [],
    idserviciodetalle: undefined,
    importeTotal:0,
    total_recepcion:0
  }

  public totalpagar=0;

  public arregloVentas: any = [];
  public conventa: any = {
    conventa: false
  };

  public cambiarTextoCantidadbool: boolean = false;
  public cambiarTextoPorcentajebool: boolean = false;

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
        if (this.venta.nombreClienteTemp != "") {
          this.venta.checkUser = true;
          this.venta.checkUserTemp = true;
        }
        if (this.venta.detalleServicio) {
          for (let arr of this.venta.detalleServicio) {
            let obj = arr.producto;
            obj.cantidad = arr.cantficha;
            obj.idserviciodetalle = arr.idserviciodetalle;
            obj.fecha = arr.fecha;
            obj.hora = arr.hora;
            obj.descuento = arr.descuento;
            obj.cancelado = arr.cancelado;
            this.arregloProductos.push(obj);
          }

          this.cambiandoprecios();   
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
    $evento.cantidad = 1;
    $evento.descuento = 0;
    $evento.cancelado = false;
    this.arregloProductos.push($evento);
    this.agregarTicket();
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
          if (!venta.checkUserTemp) {
            if (venta.cliente.id == 0 || venta.cliente == undefined || venta.cliente == null || venta.cliente.id == undefined) {
              alertify.error("No se ha seleccionado el cliente");
              return;
            }
          } else {

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
          alertify.success("El servicio esta generado, favor de ingresar los productos correspondientes y cerrar el ticket");
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


    if (this.venta.nombreClienteTemp != "") {
      this.venta.checkUser = true;
      this.venta.checkUserTemp = true;
    }
    
      if (this.venta.detalleServicio) {
        for (let arr of this.venta.detalleServicio) {
          let obj = arr.producto;
          obj.cantidad = arr.cantficha;
          obj.idserviciodetalle = arr.idserviciodetalle;
          obj.fecha = arr.fecha;
          obj.hora = arr.hora;
          obj.descuento = arr.descuento;
          obj.cancelado = arr.cancelado;
          this.arregloProductos.push(obj);
          
        }

        this.cambiandoprecios();   
      }
    
  }

  public nuevoTicket() {
    let venta = this.venta;
    let conventa = this.conventa;
    let  arregloProductos = this.arregloProductos;
    let arregloventas = this.arregloVentas;
    let serviciosPrd = this.serviciosPrd;
    alertify.confirm("¿Desea crear un nuevo ticket?", function (e) {
      if (e) {

        for (let llave in venta) {
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

        arregloProductos.splice(0,arregloProductos.length);
        serviciosPrd.getVentas(false).subscribe(datos => {
          arregloventas.splice(0,arregloventas.length);
          for(let item of datos){
            arregloventas.push(item);
          }
        
        });
      }
    });
  }

  public cancelarTicket() {
    alertify.confirm("¿Desea cancelar el ticket?", function (e) {
      if (e) {
        alertify.success("Ticket cancelado correctamente");
      }
    });
  }

  public visualizarTickets() {
    $('#myModalVentas').modal('show');
    
  }


  public eliminaritem(index,item) {
    let venta = this.venta;
    let serviciosPrd = this.serviciosPrd;
    let arregloProductos = this.arregloProductos;
    let hora = new Date();
      let obj1 = {
        producto: {
          id: item.id
        },
        idficha: item.id_ficha,
        cantficha: 0,
        fecha: (item.idserviciodetalle == undefined || item.idserviciodetalle == null) ? new Date() : item.fecha,
        hora: (item.idserviciodetalle == undefined || item.idserviciodetalle == null) ? `${hora.getHours()}:${hora.getMinutes()}` : item.hora,
        idservicio: venta.idservicio,
        idserviciodetalle: item.idserviciodetalle,
        descuento:0,
        cancelado:true
      };
      alertify.confirm("¿Desea cancelar el registro?", function (e) {
        if (e) {
          serviciosPrd.actualizarDetalle(obj1).subscribe(datos =>{
            alertify.success("Registro cancelado con exito");
            item.cancelado = true;
            item.descuento = 0;
            item.cantidad = 0;
            let total = 0;
            for(let imm of arregloProductos){
              let suma =((item.descuento == 0 ? imm.p_venta*imm.cantidad :imm.p_venta*imm.cantidad - ((imm.p_venta*imm.cantidad) * imm.descuento)/100));
               total = (total) + (suma);
              
          }
           venta.importeTotal = total;      
          });
        }});
     
  }


  public agregarTicket() {
    let arregloprouductos = this.arregloProductos;
    let serviciosPrd: ServiciosService = this.serviciosPrd;
    let venta = this.venta;

    let arregloenviar: any = [];
    let hora = new Date();
    for (let item of arregloprouductos) {
      let obj1 = {
        producto: {
          id: item.id
        },
        idficha: item.id_ficha,
        cantficha: item.cantidad,
        fecha: (item.idserviciodetalle == undefined || item.idserviciodetalle == null) ? new Date() : item.fecha,
        hora: (item.idserviciodetalle == undefined || item.idserviciodetalle == null) ? `${hora.getHours()}:${hora.getMinutes()}` : item.hora,
        idservicio: venta.idservicio,
        idserviciodetalle: item.idserviciodetalle,
        descuento:item.descuento,
        cancelado:item.cancelado
      };
      arregloenviar.push(obj1);
      
    }
    serviciosPrd.insertarDetalleServicio(arregloenviar).subscribe(dt1 => {
      serviciosPrd.getDetalleServicio(venta.idservicio).subscribe(datos =>{
        arregloprouductos.splice(0,arregloprouductos.length);
        for (let arr of datos) {
          let obj = arr.producto;
          obj.cantidad = arr.cantficha;
          obj.idserviciodetalle = arr.idserviciodetalle;
          obj.fecha = arr.fecha;
          obj.hora = arr.hora;
          obj.descuento = arr.descuento;
          obj.cancelado = arr.cancelado;
          arregloprouductos.push(obj);
        }

        let total = 0;
        for(let item of arregloprouductos){
          let suma =((item.descuento == 0 ? item.p_venta*item.cantidad :item.p_venta*item.cantidad - ((item.p_venta*item.cantidad) * item.descuento)/100));
           total = (total) + (suma);
          
      }
       venta.importeTotal = total;  

        alertify.success("Registros insertados y/o actualizados correctamente");
   });
    }, err => {
      alertify.error("Error al insertar y/o actualizar los registros");
    });
  
  }
  

  public cambiandoCantidad(item){
    item.cambiarTextoCantidadbool = false
    this.cambiandoprecios();
  }

  public cambiandoPorcentaje(item){
    item.cambiarTextoPorcentajebool = false
    this.cambiandoprecios();
  }

  public cambiandoprecios(){
    let total = 0;
        for(let item of this.arregloProductos){
          let suma =((item.descuento == 0 ? item.p_venta*item.cantidad :item.p_venta*item.cantidad - ((item.p_venta*item.cantidad) * item.descuento)/100));
           total = (total) + (suma);
          
      }
       this.venta.importeTotal = total;  
  }

}
