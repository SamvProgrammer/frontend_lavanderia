import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';
import { UnidadesMedidasService } from '../../providers/unidades-medidas.service';
import { ProductosService } from '../../providers/productos.service';
import { SucursalesService } from '../../providers/sucursales.service';
import { DISABLED } from '@angular/forms/src/model';
declare var $;
declare var alertify: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @ViewChild("clasificacionNombre") clasificacionNombre:ElementRef;
  @ViewChild("clasificacionId") clasificacionId:ElementRef;

  public arregloSucursal:any = [];
  public myForm:FormGroup;
  public objDefault = {
    p_costo:0,
    p_mayoreo:0,
    p_mediamayoreo:0,
    p_venta:0,
    p_especial:0,
    por_mayoreo:0,
    por_mediamayoreo:0,
    por_venta:0,
    por_especial:0,
    iva:16,
    ieeps:0,
    tieneiva:true,
    clasificacion:{id:0},
    unidadmedida:{id:0},
    sucursales:{id:0}
  };

  public arregloUnidad:any = [];
  public ingresar:boolean = false;
  public indice;
  public arreglo:any = [];
  constructor(public formBuilder:FormBuilder,public unidadProvider:UnidadesMedidasService,public productosPrd:ProductosService,private sucursalesPrd:SucursalesService) { }

  ngOnInit() {
    this.myForm = this.createMyForm(this.objDefault);
    this.unidadProvider.getAll().subscribe(datos =>{
      this.arregloUnidad = datos;
    });

    this.productosPrd.getAll().subscribe(datos =>{
       this.arreglo = datos;
    });



    this.sucursalesPrd.getAll().subscribe(datos =>{
        this.arregloSucursal = datos;
    });
  }

  public createMyForm(obj){
    
    return this.formBuilder.group({
       codigo:[obj.codigo,Validators.required],
       id:[obj.id],
       nombre:[obj.nombre,Validators.required],
       id_categoria:obj.clasificacion.id,
       nombre_categoria:{value:obj.clasificacion.nombre,disabled:true},
       igualdad:[obj.igualdad,Validators.required],
       id_medida:[obj.unidadmedida.id,Validators.required],
       p_costo:[obj.p_costo,Validators.required],
       p_mayoreo:[obj.p_mayoreo,Validators.required],
       p_mediamayoreo:[obj.p_mediamayoreo,Validators.required],
       p_venta:[obj.p_venta,Validators.required],
       p_especial:[obj.p_especial,Validators.required],
       por_mayoreo:[obj.por_mayoreo,Validators.required],
       por_mediamayoreo:[obj.por_mediamayoreo,Validators.required],
       por_venta:[obj.por_venta,Validators.required],
       por_especial:[obj.por_especial,Validators.required],
       generar_seriesunidad:obj.generar_seriesunidad,
       caducidad_serie:obj.caducidad_serie,
       tieneiva:obj.tieneiva,
       iva:obj.iva,
       tieneieeps:obj.tieneieeps,
       ieeps:obj.ieeps,
       id_ficha:obj.id_ficha,
       id_sucursal:[obj.sucursales.id,Validators.required]
    });
  }




  public abrirClasificacion(){
    $('#myModalCategoria').modal('show');
  }


  public recibir($evento){
    $('#myModalCategoria').modal('hide');
     this.clasificacionId.nativeElement.value = $evento.id;
     this.clasificacionNombre.nativeElement.value = $evento.nombre;
  }





  public abrir(obj,index): any {
    $('#myModal').modal('show');
    if (obj == undefined) {
      $("#titulo").text("Ingresar Producto");
      this.myForm = this.createMyForm(this.objDefault);
      this.ingresar = true;
    } else {
      $("#titulo").text("Actualizar Producto");
      this.myForm = this.createMyForm(obj);
      this.ingresar = false;
      this.indice = index;
    }
  }


  public eliminar(id,index): any {
    let auxSucursales: any = this.productosPrd;
    let arregloAux = this.arreglo;
    alertify.set({ buttonReverse: true });
    alertify.confirm("¿Desea eliminar el registro?", function (e) {
      if (e) {       
        
        auxSucursales.delete(id).subscribe(respu => {
          arregloAux.splice(index,1);
          alertify.success(respu.resultado);
        },err =>{
          let mensaje:string = err.error.message;
          if(mensaje.includes("ConstraintViolationException")){
            alertify.error("No se puede eliminar el registro porque contiene elementos asociados.");

          }else{
            alertify.error(mensaje);
          }
        });
      }
    });
  }




  


  public enviarformulario(): any {
    let obj = this.myForm.value;

    obj.unidadmedida = {
      id:obj.id_medida
    };

    obj.clasificacion = {
      id:this.clasificacionId.nativeElement.value
    }

    obj.sucursales = {
      id:obj.id_sucursal
    }

    
    $('#myModal').modal('hide');
    if (this.ingresar) {
      this.productosPrd.insert(obj).subscribe(datos => {
        alertify.success("Producto agregado correctamente");
        this.productosPrd.get(datos.id).subscribe(unico =>{
        this.arreglo.push(unico);
        });

      });
    } else {
      this.productosPrd.update(obj).subscribe(datos => {
        alertify.success("Producto actualizado correctamente");
        this.arreglo.splice(this.indice,1,datos);
      });
    }
  }
  
}
