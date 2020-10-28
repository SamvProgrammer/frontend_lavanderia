import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetallefichaService } from '../../providers/detalleficha.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { SucursalesService } from '../../providers/sucursales.service';
import { direcciones } from '../../direcciones';
declare var alertify: any;

@Component({
  selector: 'app-detalle-fichas',
  templateUrl: './detalle-fichas.component.html',
  styleUrls: ['./detalle-fichas.component.css']
})
export class DetalleFichasComponent implements OnInit {

  public myForm: FormGroup;
  public arregloUsuarios: any = [];
  public arregloSucursales: any = [];
  public arregloDetalleGrid: any = [];

  public arregloSuma: any = [];                                                          
  public parametro;


  public ingresar: boolean = false;
  public tipoboton: boolean = false;

  constructor(public formBuilder: FormBuilder, public detallefichaServ: DetallefichaService, public usariosPrd: UsuariosService, public susrsalesPrd: SucursalesService) { }


  ngOnInit() {

    this.myForm = this.createMyForm("");

    this.usariosPrd.obtenerAll().subscribe(datos => {
      this.arregloUsuarios = datos;
    });

    this.susrsalesPrd.getAll().subscribe(datos1 => {
      this.arregloSucursales = datos1
    });


  }


  public createMyForm(obj) {
    return this.formBuilder.group({
      idsucursal: [obj.idsucursal, Validators.required],
      tipo_servicio: [obj.tipo_servicio, Validators.required],
      empleado: [obj.empleado, Validators.required],
      desde: [obj.desde, Validators.required],
      hasta: [obj.hasta, Validators.required],
      id: obj.id
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;
    let idsucursal = obj.idsucursal;
    let tipo_servicio = obj.tipo_servicio;
    let empleado = obj.empleado;
    let desde = obj.desde;
    let hasta = obj.hasta;


    if (this.tipoboton === false) {
      this.detallefichaServ.getDetalle(idsucursal, tipo_servicio, empleado, desde, hasta).subscribe(detalle => {
        this.arregloDetalleGrid = detalle;

      });
      this.detallefichaServ.SumaDetalle(idsucursal, tipo_servicio, empleado, desde, hasta).subscribe(suma => {
        this.arregloSuma = suma;


        let totalserv = this.arregloSuma["totalserv"];
        let ficha4kg = this.arregloSuma["ficha4kg"];
        let ficha8kg = this.arregloSuma["ficha8kg"];
        let secadora = this.arregloSuma["secadora"];

if (totalserv== undefined){
        if (totalserv ==undefined)
        {
          totalserv = 0;
        }
        if (ficha4kg ==undefined)
        {
          ficha4kg = 0;
        }
        if (ficha8kg ==undefined)
        {
          ficha8kg = 0;
        }
        if (secadora ==undefined)
        {
          secadora = 0;
        }

        let obj ={
          "totalserv" : totalserv , 
          "ficha4kg" : ficha4kg,
          "ficha8kg" : ficha8kg,
          "secadora" : secadora

        }

        this.arregloSuma.push(obj);
      }

      });
    }

    if (this.tipoboton === true) {
      if (idsucursal != 0 && tipo_servicio != 0 && empleado != 0) {
        document.location.href = (`https://docs.google.com/viewer?url=${direcciones.reportes}/servicio/${desde}/${hasta}/${idsucursal}/${tipo_servicio}/${empleado}/pdf`);
      }
      if (idsucursal == 0 && tipo_servicio == 0 && empleado == 0) {
        document.location.href = (`https://docs.google.com/viewer?url=${direcciones.reportes}/servicio/solo/${desde}/${hasta}/pdf`);
      }

      if (idsucursal != 0 && tipo_servicio == 0 && empleado != 0) {
        document.location.href = (`https://docs.google.com/viewer?url=${direcciones.reportes}/servicio/noservicio/${desde}/${hasta}/pdf`);
      }
      if (idsucursal == 0 && tipo_servicio != 0 && empleado != 0) {
        document.location.href = (`https://docs.google.com/viewer?url=${direcciones.reportes}/servicio/nosucursal/${desde}/${hasta}/pdf`);
      }

      if (idsucursal == 0 && tipo_servicio == 0 && empleado == 0) {
        document.location.href = (`https://docs.google.com/viewer?url=${direcciones.reportes}/servicio/todos/${desde}/${hasta}/pdf`);
      }

    }


  }
}

