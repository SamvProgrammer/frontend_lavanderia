import { Component, OnInit } from '@angular/core';
import { ClienteservService } from '../../providers/clienteserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;
  public fecha: Date;

  constructor(public formBuilder: FormBuilder, public clientesPrd: ClienteservService) { }

  ngOnInit() {
    this.clientesPrd.getAll().subscribe(datos => {
      this.arreglo = datos;
    });
    //let dateFormat = require('dateformat');
    //let now = new Date();
    //dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    this.myForm = this.createMyForm("");
  }


  public createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      apellido: [obj.apellido, Validators.required],
      direccion: [obj.direccion, Validators.required],
      ciudad: [obj.ciudad, Validators.required],
      codigopostal: [obj.codigopostal, Validators.required],
      estado: [obj.estado, Validators.required],
      pais: [obj.pais, Validators.required],
      rfc: [obj.rfc, Validators.required],
      telefono: [obj.telefono, Validators.required],
      observaciones: [obj.observaciones],
      id: obj.id,
      credito:obj.credito,
      creditoVencido:obj.creditoVencido,
      otorgarCredito:obj.otorgarCredito,
      tipoCredito:obj.tipoCredito,
      dias:obj.dias,
      descuento:obj.descuento,
      clientePolizaserv:obj.clientePolizaserv,
      limiteCredito:obj.limiteCredito,
      saldo:obj.saldo
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;


    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.clientesPrd.insert(obj).subscribe(datos => {
        alertify.success('REGISTRO INSERTADO');
        this.ngOnInit();

      });
    } else {
      this.clientesPrd.update(obj).subscribe(datos => {
        alertify.success('REGISTRO ACTUALIZADO');
        this.ngOnInit();
      });
    }
  }


  public eliminar(id): any {
    let clientePrdVar = this.clientesPrd;

    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {
        clientePrdVar.delete(id).subscribe(respu => {
          alertify.success('REGISTRO ELIMINADO');
          localStorage["actualizar"] = true;
        });
      }
    });

  }


  public actualizandoArreglo() {

    setTimeout(() => {
      if (localStorage["actualizar"] == "true") {
        localStorage["actualizar"] = false;
        this.clientesPrd.getAll().subscribe(datos => {
          this.arreglo = datos;
        });
      } else {
        this.actualizandoArreglo();
      }
    }, 500);
  }

  public abrir(obj): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar Cliente");

      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar Cliente");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
    }
  }
}

