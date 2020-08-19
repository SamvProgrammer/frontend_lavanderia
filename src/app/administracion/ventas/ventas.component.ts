import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
public usuarios;
public clientebool:boolean = false;
  constructor(public usuariosPrd:UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosPrd.getUsuario();
    console.log(this.usuarios.usuario);
  }

}
