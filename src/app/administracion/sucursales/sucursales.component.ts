import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalesService } from 'src/app/providers/sucursales.service';


declare var $;
declare var alertify: any;

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {


  private myForm: FormGroup;
  private ingresar:boolean = false;
  private arreglo:any = [];
  private indice:number = 0;

  constructor(  public formBuilder: FormBuilder,private sucursalesPrd:SucursalesService) { 
   
  }

  ngOnInit() {

    this.sucursalesPrd.getAll().subscribe(datos =>{
      this.arreglo = datos;

      console.log("Se ejecuta la tabla");
      $('#tablaSucursales').DataTable({
        "language": {
            "lengthMenu": "Visualizar _MENU_ registros por página",
            "zeroRecords": "Registro no encontradao",
            "info": "Página visualizada _PAGE_ de _PAGES_",
            "infoEmpty": "Registros no disponibles",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "paginate": {
              "previous": "Anterior",
              "next":"Siguiente"
            }
        }
    } );
    });

   


  this.myForm = this.createMyForm("");
  }

  public createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      direccion: [obj.direccion, Validators.required],
      activa: obj.activa,
      id: obj.id
    });
  }


  public abrir(obj,index): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar Sucursal");
      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar Sucursal");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
      this.indice = index;
    }
  }


  public eliminar(id,index): any {
    let auxSucursales: any = this.sucursalesPrd;
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
      this.sucursalesPrd.insert(obj).subscribe(datos => {
        alertify.success("Sucursal agregada correctamente");
        this.arreglo.push(datos);

      });
    } else {
      this.sucursalesPrd.update(obj).subscribe(datos => {
        alertify.success("Sucursal actualizada correctamente");
        console.log("Este es el indice");
        console.log(this.indice);
        this.arreglo.splice(this.indice,1,datos);
      });
    }
  }

}
