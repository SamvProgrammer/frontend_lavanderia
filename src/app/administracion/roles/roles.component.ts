import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolesService } from '../../providers/roles.service';


declare var $;
declare var alertify: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public myForm: FormGroup;
  public ingresar:boolean = false;
  public arreglo:any = [];
  public indice:number = 0;
  public arreglomenu:any = [];

  constructor(  public formBuilder: FormBuilder,public rolesPrd:RolesService) { 
   
  }

  ngOnInit() {

    this.rolesPrd.getAll().subscribe(datos =>{
      this.arreglo = datos;
    });

   


  this.myForm = this.createMyForm("");
  }

  public createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      id: obj.id
    });
  }


  public abrir(obj,index): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      this.arreglomenu = [];
      $("#titulo").text("Ingresar Sucursal");
      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar Sucursal");
      this.myForm = this.createMyForm(obj);
      this.arreglomenu = obj.listaMenu;
      this.ingresar = false;
      this.indice = index;
    }
  }


  public eliminar(id,index): any {
    let auxSucursales: any = this.rolesPrd;
    let arregloAux = this.arreglo;
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
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
    if(this.arreglomenu.length == 0){
      alertify.error("Agregar algún elemento de menú al rol de usuario");
      return;
    }

    obj.listaMenu = this.arreglomenu;
   
    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.rolesPrd.insert(obj).subscribe(datos => {
        alertify.success("Rol agregado correctamente");
        this.arreglo.push(datos);

      });
    } else {
      this.rolesPrd.update(obj).subscribe(datos => {
        alertify.success("Rol actualizado correctamente");
        console.log("Este es el indice");
        console.log(this.indice);
        this.arreglo.splice(this.indice,1,datos);
      });
    }
  }



  public recibir($event){
     this.arreglomenu = $event;
     $('#mymodalmenu').modal('hide');
  }

 
}
