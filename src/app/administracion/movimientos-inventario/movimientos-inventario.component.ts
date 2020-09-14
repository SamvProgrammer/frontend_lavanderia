import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../providers/usuarios.service';
import { SucursalesService } from '../../providers/sucursales.service';
import { ControlmovimientoService } from '../../providers/controlmovimiento.service';

declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-movimientos-inventario',
  templateUrl: './movimientos-inventario.component.html',
  styleUrls: ['./movimientos-inventario.component.css']
})
export class MovimientosInventarioComponent implements OnInit {

  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;
  public getareegloProduc: any[];
  public getTabla: any[];


  public arregloUsuarios: any = [];
  public arregloSucursales: any = [];
  public arregloTablas: any = [];
  public id_usuario;

  constructor(public formBuilder: FormBuilder, public usariosPrd: UsuariosService, public susrsalesPrd: SucursalesService , public controlPrd : ControlmovimientoService) { }

  ngOnInit() {
    this.myForm = this.createMyForm("");

  let v =this.usariosPrd.getUsuario();
  this.id_usuario = v["id"];
  console.log(this.id_usuario);

    this.susrsalesPrd.getAll().subscribe(datos1 => {
      this.arregloSucursales = datos1;
    });


  }


  public abrir(obj): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar productoS");

  
      this.ingresar = true;
    }
  }



  public createMyForm(obj) {
    return this.formBuilder.group({
      cantidad: [obj.cantidad],
      bodega: [obj.bodega],
      movimiento: [obj.movimiento],
      id: obj.id
    });
  }



  public abrirProductos() {
    $("#myModalProductos").modal('show');
  }

  public recibirProducto(producto) {
    this.getareegloProduc = producto;
  }






  public eliminar(id, index): any {
    let arregloAux = this.arregloTablas;
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {
        arregloAux.splice(index, 1);
        alertify.success("registro eliminado");
      }
    });
  }


  public enviaMovimientos(): any {

  
    var myJsonString = JSON.stringify(this.arregloTablas);
    console.log(myJsonString);



this.controlPrd.insert(myJsonString).subscribe(datos => {
  alertify.success("Producto agregado correctamente");

  });


  }


  public enviaObjeto(): any {

    let id = this.getareegloProduc["id"];
    let nombre = this.getareegloProduc["nombre"];
    let unidadmedida = this.getareegloProduc["unidadmedida"]["descripcion"];
    let forma = this.myForm.value
    let cantidad = forma.cantidad;
    let mov = forma.movimiento;
    let bo = forma.bodega;

    let obj = {
      "id_producto": id,
      "nombre": nombre,
      "unidadmedida": unidadmedida,
      "cantidad": cantidad ,
      "tipo_mov": mov,
      "id_sucursal": bo,
      "id_usuario" : this.id_usuario
    };

    this.arregloTablas.push(obj);

    $("#myModal").modal('hide');

  }







}