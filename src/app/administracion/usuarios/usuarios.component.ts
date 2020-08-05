import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public myForm: FormGroup;
  public arreglo: any = [];
  public ingresar: boolean = false;


  constructor(private usuarioPrd: UsuariosService,
    public formBuilder: FormBuilder) {
    localStorage["actualizar"] = false;
  }

  ngOnInit() {
    this.usuarioPrd.obtenerAll().subscribe(datos => {
      this.arreglo = datos;
      console.log(datos);
    });

    this.myForm = this.createMyForm("");
  }


  public createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      usuario: [obj.usuario, Validators.required],
      password: obj.password,
      id_rol:[obj.id_rol,Validators.required],
      id: obj.id
    });
  }

  public enviarformulario(): any {
    let obj = this.myForm.value;

   
    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.usuarioPrd.insertar(obj).subscribe(datos => {
        alertify.success(datos.respuesta);
        this.ngOnInit();

      });
    } else {
      this.usuarioPrd.actualizar(obj).subscribe(datos => {
        alertify.success(datos.respuesta);
        this.ngOnInit();
      });
    }
  }


  public eliminar(id): any {
    let clientePrdVar = this.usuarioPrd;
    
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {
        clientePrdVar.eliminar(id).subscribe(respu => {
          alertify.success(respu.respuesta);
          localStorage["actualizar"] = true;
        });
      }
    });


    this.actualizandoArreglo();


  }


  public actualizandoArreglo() {

    setTimeout(() => {
      if (localStorage["actualizar"] == "true") {
        localStorage["actualizar"] = false;
        this.usuarioPrd.obtenerAll().subscribe(datos => {
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
      $("#titulo").text("Ingresar Usuario");

      this.myForm = this.createMyForm("");
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar cliente");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
    }
  }



}

