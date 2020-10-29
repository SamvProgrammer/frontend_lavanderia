import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../providers/servicios.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { ProductosService } from '../../providers/productos.service'

declare var alertify;
declare var $;

@Component({
  selector: 'app-agregafichas',
  templateUrl: './agregafichas.component.html',
  styleUrls: ['./agregafichas.component.css']
})
export class AgregafichasComponent implements OnInit {


  public fechaa;
  public arreglo: any =[];
  public productos:any = [];
  public productosAgregados = [];
  public indexseleccionado = 0;

  constructor(private ventasPrd:ServiciosService,private usuariosPrd:UsuariosService,private productosPrd:ProductosService) { }

  ngOnInit() {
    let idSucursal = this.usuariosPrd.getSucursal();

    this.productosPrd.getfichas(idSucursal.id).subscribe(datos =>{
      this.productos = datos;
      
    });
  }


  public buscar(){



    let obj = {
      fecha: this.fechaa,
      cobrado: true
    };
    this.ventasPrd.getCobradosFecha(obj).subscribe(datos =>{
        this.arreglo = datos;
        
    });
  }


  public abrir(item,indice){
     if(item.tipoServicio != 1){
      alertify.error("No se puede agregar fichas a un autoservicio");
     }else{

      this.productosAgregados = [];
      this.ventasPrd.getFichasServicioDetalle(item.idservicio).subscribe(datos =>{
        for(let ii of datos){

          let obj = {
            id:ii.producto.id,
            nombre:ii.producto.nombre,
            ficha_adicional:ii.ficha_adicional,
            cantficha:ii.cantficha,
            idservicio:ii.idserviciodetalle
          }

          this.productosAgregados.push(obj);
        }
        $('#myModal').modal('show');
      });
      
      this.indexseleccionado = indice;
      
  }}


  public agregarFicha(item){
    
    let encontrado:boolean = false;

    for(let ii of this.productosAgregados){

      
      if(ii.id == item.id && ii.ficha_adicional){

        encontrado = true;
        ii.cantficha++;
        break;
      }

    }

    if(!encontrado){
     item.cantficha = 1;
     item.idficha = item.id_ficha;
     item.ficha_adicional = true;
     item.producto = {
       id:item.id
     };
     this.productosAgregados.push(item);
    }
    

  }

  public eliminar(indice){

    console.log(this.productosAgregados[indice]);
    if(this.productosAgregados[indice].cantficha > 1 ){
      this.productosAgregados[indice].cantficha--;
    }else{
      
      let ventasPrd = this.ventasPrd;
      let productosAgregados =  this.productosAgregados;
  

      if(this.productosAgregados[indice].idservicio != undefined ){
        alertify.confirm("¿Desea eliminar permanentemente la ficha del servicio?", function (e) {
          if (e) {
     
            ventasPrd.eliminarDetalleServicio(productosAgregados[indice].idservicio).subscribe(()=>{
    
              productosAgregados.splice(indice,1);
            });
            
          }});
      }else{
        this.productosAgregados.splice(indice,1);
      }
     
    }
  }

  public GuardarFichas(){
    let arregloEnviar = [];
    for(let item of this.productosAgregados){
       if(item.ficha_adicional){
            item.idservicio = this.arreglo[this.indexseleccionado].idservicio;
            arregloEnviar.push(item);
       }
    }

    this.ventasPrd.insertarDetalleServicio(arregloEnviar).subscribe(()=>{
      alertify.success("Fichas agregadas con exito");
      
    });

  }

}
