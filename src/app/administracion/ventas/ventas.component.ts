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
  public sucursal;
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
    importeTotal: 0,
    total_recepcion: 0,
    ordenPagada: false,
    fechaterminado: undefined,
    totalescosto: 0,
    subtotales: 0,
    iva: 16,
    cancelado: false
  }

  public objfinalizado = {
    importeTotal: 0,
    montorecibido: 0,
    productos: [],
    metodo: {
      nombre: "METODO",
      clase: 'fa fa-money'
    }
  }

  public totalpagar = 0;

  public arregloVentas: any = [];
  public conventa: any = {
    conventa: false
  };

  public montoefectivo = 0;

  public cambiarTextoCantidadbool: boolean = false;
  public cambiarTextoPorcentajebool: boolean = false;
  public desactivarmetodopago: boolean = false;

  public metodos = [
    { nombre: "Efectivo", seleccionado: true, clase: 'fa fa-money', desactivarmetodopago: false },
    { nombre: "Tarjeta crecito / debito", seleccionado: false, clase: 'fa fa-credit-card', desactivarmetodopago: true },
    { nombre: "Otros", seleccionado: false, clase: 'fa fa-handshake-o', desactivarmetodopago: false }];

  public arreglocobrados: any = [];

  constructor(public usuariosPrd: UsuariosService, private serviciosPrd: ServiciosService) { }

  ngOnInit() {

    // $('#modalfinalizado').modal('show');

    this.usuarios = this.usuariosPrd.getUsuario();
    this.sucursal = this.usuariosPrd.getSucursal();

    console.log(this.sucursal);
    this.serviciosPrd.getVentas(false).subscribe(datos => {
      this.arregloVentas = datos;
      if (this.arregloVentas.length > 1) {
        $('#myModalVentas').modal('show');

      } else if (this.arregloVentas.length == 1) {
        this.venta = this.arregloVentas[0];

        this.venta.valorservicio = this.venta.tipoServicio != 1 ? "true" : "false";
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
    console.log($evento);
    this.arregloProductos.push($evento);
    this.agregarTicket();
  }




  public generarServicio() {
    //alertify.error('Error, falta datos que rellenar');
    let conventa1 = this.conventa;
    let venta = this.venta;
    let usuarios = this.usuarios;
    let serviciosPrd = this.serviciosPrd;
    let sucursal = this.sucursal;


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
        venta.idsucursal = sucursal.id;


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
    let arregloProductos = this.arregloProductos;
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

        arregloProductos.splice(0, arregloProductos.length);
        serviciosPrd.getVentas(false).subscribe(datos => {
          arregloventas.splice(0, arregloventas.length);
          for (let item of datos) {
            arregloventas.push(item);
          }

        });
      }
    });
  }

  public cancelarTicket() {
    let venta = this.venta;
    let servicePrd = this.serviciosPrd;
    let conventa = this.conventa;
    let arregloProductos = this.arregloProductos;
    let arregloVentas = this.arregloVentas;
    alertify.confirm("¿Desea cancelar el ticket?", function (e) {
      if (e) {
        venta.cancelado = true;
        venta.ordenPagada = true;
        venta.fechaterminado = new Date();
        venta.detalleServicio = arregloProductos;
        servicePrd.realizarVenta(venta).subscribe(datos => {
          alertify.success("Ticket cancelado correctamente");
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

          arregloProductos.splice(0, arregloProductos.length);
          servicePrd.getVentas(false).subscribe(datos => {
            arregloVentas.splice(0, arregloVentas.length);
            for (let item of datos) {
              arregloVentas.push(item);
            }

          });
        });
      }
    });
  }

  public visualizarTickets() {
    $('#myModalVentas').modal('show');

  }


  public eliminaritem(index, item) {
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
      descuento: 0,
      cancelado: true
    };
    alertify.confirm("¿Desea cancelar el registro?", function (e) {
      if (e) {
        serviciosPrd.actualizarDetalle(obj1).subscribe(datos => {
          alertify.success("Registro cancelado con exito");
          item.cancelado = true;
          item.descuento = 0;
          item.cantidad = 0;
          let total = 0;
          let totalesCosto = 0;
          for (let imm of arregloProductos) {
            let suma = ((item.descuento == 0 ? imm.p_venta * imm.cantidad : imm.p_venta * imm.cantidad - ((imm.p_venta * imm.cantidad) * imm.descuento) / 100));
            total = (total) + (suma);
            totalesCosto = totalesCosto + item.p_costo;
          }
          venta.importeTotal = total;
          venta.subtotales = venta.importeTotal - (venta.importeTotal / 1.16);
          venta.totalescosto = totalesCosto;
        });
      }
    });

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
        descuento: item.descuento,
        cancelado: item.cancelado
      };
      arregloenviar.push(obj1);

    }
    serviciosPrd.insertarDetalleServicio(arregloenviar).subscribe(dt1 => {
      serviciosPrd.getDetalleServicio(venta.idservicio).subscribe(datos => {
        arregloprouductos.splice(0, arregloprouductos.length);
        for (let arr of datos) {
          let obj = arr.producto;
          obj.cantidad = arr.cantficha;
          obj.idserviciodetalle = arr.idserviciodetalle;
          obj.fecha = arr.fecha;
          obj.hora = arr.hora;
          obj.descuento = arr.descuento;
          obj.cancelado = arr.cancelado;
          obj.idservicio = arr.idservicio;
          arregloprouductos.push(obj);
        }

        this.cambiandoprecios();

        alertify.success("Registros insertados y/o actualizados correctamente");
      });
    }, err => {
      alertify.error("Error al insertar y/o actualizar los registros");
    });

  }


  public cambiandoCantidad(item) {
    item.cambiarTextoCantidadbool = false
    this.cambiandoprecios();
  }

  public cambiandoPorcentaje(item) {
    item.cambiarTextoPorcentajebool = false
    this.cambiandoprecios();
  }

  public cambiandoprecios() {
    let total = 0;
    let totalesCosto = 0;
    for (let item of this.arregloProductos) {
      let suma = ((item.descuento == 0 ? item.p_venta * item.cantidad : item.p_venta * item.cantidad - ((item.p_venta * item.cantidad) * item.descuento) / 100));
      total = (total) + (suma);
      totalesCosto = totalesCosto + item.p_costo;
    }
    this.venta.importeTotal = total;
    this.venta.subtotales = this.venta.importeTotal - (this.venta.importeTotal / 1.16);
    this.venta.totalescosto = totalesCosto;
  }


  public finalizar() {
    console.log(this.arregloProductos.length == 0);
    if (this.arregloProductos == 0) {
      alertify.error("No se puede finalizar porque no hay productos por cobrar");

    } else {
      $("#mymodalfinalizar").modal('show');
    }

  }

  public cobrar() {
    let monto = this.montoefectivo;
    let venta = this.venta;
    let serviciosPrd = this.serviciosPrd;
    let conventa = this.conventa;
    let arregloProductos = this.arregloProductos;
    let arregloVentas = this.arregloVentas;
    let objfinalizado = this.objfinalizado;
    let metodos = this.metodos;
    alertify.confirm("¿Deseas cobrar el servicio?", function (e) {
      if (e) {
        if (monto < venta.importeTotal) {
          alertify.error("El monto a pagar es menor al monto total de la compra");
        } else {
          venta.ordenPagada = true;
          venta.fechaterminado = new Date();

          venta.detalleServicio = arregloProductos;

          serviciosPrd.realizarVenta(venta).subscribe(datos => {
            alertify.success("Ticket cobrado con exito");
            $("#mymodalfinalizar").modal('hide');
            objfinalizado.importeTotal = datos.importeTotal;
            objfinalizado.montorecibido = monto;
            let mm = undefined;
            for (let x1 of metodos) {
              if (x1.seleccionado) {
                mm = x1;
                break;
              }
            }

            objfinalizado.metodo.nombre = mm.nombre;
            objfinalizado.metodo.clase = mm.clase;
            let arreglotemp = [];
            for (let item of arregloProductos) {
              let obj = {};
              for (let llave in item) {
                obj[llave] = item[llave];
              }
              arreglotemp.push(obj);
            }

            objfinalizado.productos = arreglotemp;


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
            

            arregloProductos.splice(0, arregloProductos.length);
            serviciosPrd.getVentas(false).subscribe(datos => {
              arregloVentas.splice(0, arregloVentas.length);
              for (let item of datos) {
                arregloVentas.push(item);
              }

            });


            $("#modalfinalizado").modal('show');

          }, erro => {
            alertify.error("Error al finalizar el ticket");
          });


        }

      }
    });
  }

  public seleccionarForma(item) {
    for (let xx of this.metodos)
      xx.seleccionado = false;

    item.seleccionado = true;

    this.desactivarmetodopago = item.desactivarmetodopago;

    this.montoefectivo = this.desactivarmetodopago ? this.venta.importeTotal : 0;

  }


  public reimprimir() {
    let productos = "";
    for (let item of this.objfinalizado.productos) {
      let m1 = `<tr>
       <td class="cantidad">${item.cantidad}</td>
       <td class="producto">${item.nombre}</td>
       <td class="precio">${item.p_venta * item.cantidad}</td>
   </tr>`;
      productos = productos + m1;
    }

    let productostotal = ` <tr>
    <td class="cantidad"></td>
    <td class="producto">TOTAL</td>
    <td class="precio">${this.objfinalizado.importeTotal}</td>
</tr>`;

    let w = 400;
    let h = 600;

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    let myWindow = window.open('', '', `
   scrollbars=yes,
   width=${w / systemZoom}, 
   height=${h / systemZoom}, 
   top=${top}, 
   left=${left}
   `);
    myWindow.document.write(`<!DOCTYPE html>
    <html>
        <head>
            
        <style>
        * {
          width: 260px;
        font-size: 12px;
        font-family: 'Times New Roman';
    }
    
    td,
    th,
    tr,
    table {
        border-top: 1px solid black;
        border-collapse: collapse;
    }
    
    td.producto,
    th.producto {
        width: 75px;
        max-width: 75px;
    }
    
    td.cantidad,
    th.cantidad {
        width: 40px;
        max-width: 40px;
        word-break: break-all;
    }
    
    td.precio,
    th.precio {
        width: 40px;
        max-width: 40px;
        word-break: break-all;
    }
    
    .centrado {
        text-align: center;
        align-content: center;
    }
    
    .ticket {
        width: 155px;
        max-width: 155px;
    }
    
    img {
        max-width: inherit;
        width: inherit;
    }
    
    @media print {
      body {
        width: 100px;
        height: 100px;
      }
      /* etc */
    }
        </style>
        </head>
        <body>
            <div class="ticket">
                <img  style='margin-left: 51px;'
                    src='../../../assets/img/logo.PNG'
                    alt="Logotipo">
                <p class="centrado">LAVAMAX 
                    <br> ${this.sucursal.nombre}
                    <br>${new Date().toLocaleDateString()} ${new Date().toTimeString().substring(0, 5)}</p>
                <table style='width: 257px;'>
                    <thead>
                        <tr>
                            <th class="cantidad">CANT</th>
                            <th class="producto">PRODUCTO</th>
                            <th class="precio">$$</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productos}
                        ${productostotal}
                    </tbody>
                </table>
                <p class="centrado">¡GRACIAS POR SU PREFERENCIA!
                    <br>--------------</p>
            </div>
        
        <button id="cargando" style="display:none">Imprimir ticket</button>
        </body>
      
      <script>
        window.onload = function(){
             let button = document.getElementById("cargando");
           button.style.display = "block";
           button.addEventListener("click",function(){
           button.style.display = "none";
           window.print();
           },false);
        }
        
        
      </script>
    </html>`);


    myWindow.document.close(); //missing code


    myWindow.focus();

  }







}
