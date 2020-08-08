import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './administracion/login-admin/login-admin.component';
import { UsuariosComponent } from '../app/administracion/usuarios/usuarios.component';
import { AutenticadoService } from './providers/autenticado.service';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { SucursalesComponent } from './administracion/sucursales/sucursales.component';
import { UnidadesMedidaComponent } from './administracion/unidades-medida/unidades-medida.component';
import {ProveedoresComponent} from './administracion/proveedores/proveedores.component';
import {ClientesComponent} from './administracion/clientes/clientes.component';

const routes: Routes = [
  {path: 'ingresar', component : LoginAdminComponent},
  {path:'',component:InicioComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/usuarios',component:UsuariosComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/sucursales',component:SucursalesComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/unidadmedida',component:UnidadesMedidaComponent,canActivate:[AutenticadoService]},
  {path:'catalogos/proveedores',component:ProveedoresComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/clientes',component:ClientesComponent, canActivate:[AutenticadoService]},



  {path:'**',component : LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
