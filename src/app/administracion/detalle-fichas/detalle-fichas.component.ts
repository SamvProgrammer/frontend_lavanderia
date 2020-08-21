import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetallefichaService } from '../../providers/detalleficha.service';
declare var alertify: any;

@Component({
  selector: 'app-detalle-fichas',
  templateUrl: './detalle-fichas.component.html',
  styleUrls: ['./detalle-fichas.component.css']
})
export class DetalleFichasComponent implements OnInit {

  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;
  public tipoboton: boolean = false;

  constructor(public formBuilder: FormBuilder, public detalleficha: DetallefichaService) { }


  ngOnInit() {


    this.myForm = this.createMyForm("");

  }


  public createMyForm(obj) {
    return this.formBuilder.group({
      sucursal: [obj.sucursal, Validators.required],
      tipo_servicio: [obj.tipo_servicio, Validators.required],
      empleado: [obj.empleado, Validators.required],
      desde: [obj.desde, Validators.required],
      hasta: [obj.hasta, Validators.required],
      id: obj.id
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;
    console.log(obj);
    console.log(this.tipoboton);
  }
}

