import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';

declare var $;
declare var alertify: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild("nombrecliente") nombreClienteId:ElementRef;
  @ViewChild("apellidocliente") apellidoClienteId:ElementRef;
public usuarios;
public clientebool:boolean = false;
public valorservicio:boolean = false;
  constructor(public usuariosPrd:UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosPrd.getUsuario();
    console.log(this.usuarios.usuario);
  }

  public abriClientes(){
    $('#myModalclientees').modal('show');

  }

  public recibir($evento){
    $('#myModalclientees').modal('hide');
    this.nombreClienteId.nativeElement.value = $evento.nombre;
    this.apellidoClienteId.nativeElement.value = $evento.apellido;
  }

}
