import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadesMedidasService } from '../../providers/unidades-medidas.service';

declare var $;
declare var alertify: any;

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class UnidadesMedidaComponent implements OnInit {

  public myForm: FormGroup;
  public ingresar:boolean = false;
  public arreglo:any = [];
  public indice:number = 0;

  constructor(  public formBuilder: FormBuilder,public medidasPrd:UnidadesMedidasService) { 
   
  }

  ngOnInit() {

    this.medidasPrd.getAll().subscribe(datos =>{
      this.arreglo = datos;

      console.log("Se ejecuta la tabla");
    });

   


  this.myForm = this.createMyForm("");
  }

  public createMyForm(obj) {
    return this.formBuilder.group({
      descripcion: [obj.descripcion, Validators.required],
      suspendido: obj.suspendido,
      peso: obj.peso,
      id: obj.id
    });
  }


  public abrir(obj,index): any {
    console.log("CUANDO SE ABRE LA MODAL");
    console.log(obj);
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar Unidad de medida");
      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar Unidad de medida");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
      this.indice = index;
    }
  }


  public eliminar(id,index): any {
    let auxSucursales: any = this.medidasPrd;
    let arregloAux = this.arreglo;
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      console.log("Despuez del evento");
      console.log(auxSucursales);
      if (e) {       
        
        auxSucursales.delete(id).subscribe(respu => {
          arregloAux.splice(index,1);
          alertify.success(respu.resultado);
        });
      }
    });
  }


  public enviarformulario(): any {
    let obj = this.myForm.value;

   
    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.medidasPrd.insert(obj).subscribe(datos => {
        alertify.success("Unidad de medida agregada correctamente");
        this.arreglo.push(datos);

      });
    } else {
      this.medidasPrd.update(obj).subscribe(datos => {
        alertify.success("Unidad de medida actualizada correctamente");
        console.log("Este es el indice");
        console.log(this.indice);
        this.arreglo.splice(this.indice,1,datos);
      });
    }
  }

}
