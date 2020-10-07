import { Component, OnInit } from '@angular/core';
import { SucursalesService } from '../../providers/sucursales.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlmovimientoService } from '../../providers/controlmovimiento.service';
import {DetallefichaService} from '../../providers/detalleficha.service';
import {direcciones} from '../../direcciones'

declare var alertify: any;


@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})
export class CorteComponent implements OnInit {

  public arregloSucursales:any =[];
  public myForm: FormGroup;
  public id_usuario;


  constructor(public formBuilder: FormBuilder ,public fichasPrd: DetallefichaService, public usariosPrd: UsuariosService, public susrsalesPrd: SucursalesService, public controlPrd: ControlmovimientoService) { }

  ngOnInit() {

    this.myForm = this.createMyForm("");

    let v = this.usariosPrd.getUsuario();
    this.id_usuario = v["id"];
    console.log(this.id_usuario);

    this.susrsalesPrd.getAll().subscribe(datos1 => {
      this.arregloSucursales = datos1;
    });

  }


  
  public createMyForm(obj) {
    return this.formBuilder.group({
      id_usuario: this.id_usuario,
      bodega: [obj.bodega],
    });
  }


  
  public enviaMovimientos(): any {

    let forma = this.myForm.value;
    let id_sucursal = forma.bodega;

    let obj = {
      "id_usuario": this.id_usuario,
      "id_sucursal" :id_sucursal

    };

    var myJsonString = JSON.stringify(obj);
    console.log(myJsonString);

    document.location.href = (`https://docs.google.com/viewer?url=${direcciones.reportes}/corte/${id_sucursal}/${this.id_usuario}/pdf`);



  }


  
}
