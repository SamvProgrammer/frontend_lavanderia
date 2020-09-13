import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../providers/usuarios.service';
import { SucursalesService } from '../../providers/sucursales.service';

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

  constructor(public formBuilder: FormBuilder, public usariosPrd: UsuariosService, public susrsalesPrd: SucursalesService) { }

  ngOnInit() {
    this.myForm = this.createMyForm("");


    this.usariosPrd.obtenerAll().subscribe(datos => {
      this.arregloUsuarios = datos;
      console.log(datos);
    });

    this.susrsalesPrd.getAll().subscribe(datos1 => {
      this.arregloSucursales = datos1;
      console.log(datos1);
    });


  }


  public abrir(obj): any {
    console.log('modifica');
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar producto");

      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar proveedor");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
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
    $("#myModalProductos").modal('show')
  }

  public recibirProducto(producto) {
    this.getareegloProduc = producto;
    $("#myModalProductos").modal('hide')
  }

  public enviarformulario(): any {




  }

  public enviaObjeto(): any {

    let id = this.getareegloProduc["id"];
    let nombre = this.getareegloProduc["nombre"];
    let unidadmedida = this.getareegloProduc["unidadmedida"]["descripcion"];
    let forma = this.myForm.value
    let cantidad = forma.cantidad;
    let obj = {
      "id": id,
      "nombre": nombre,
      "unidadmedida": unidadmedida,
      "cantidad": cantidad
    };

    this.arregloTablas.push(obj);
    console.log(this.arregloTablas);

  }



}