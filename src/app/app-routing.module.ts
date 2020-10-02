import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './administracion/login-admin/login-admin.component';
import { UsuariosComponent } from '../app/administracion/usuarios/usuarios.component';
import { AutenticadoService } from './providers/autenticado.service';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { SucursalesComponent } from './administracion/sucursales/sucursales.component';
import { UnidadesMedidaComponent } from './administracion/unidades-medida/unidades-medida.component';
import { ProveedoresComponent } from './administracion/proveedores/proveedores.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { LineasComponent } from './administracion/lineas/lineas.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { ClientesComponent } from './administracion/clientes/clientes.component';
import { VentasComponent } from './administracion/ventas/ventas.component';
import { DetalleFichasComponent } from './administracion/detalle-fichas/detalle-fichas.component';
import { RolesComponent } from './administracion/roles/roles.component';
import {MovimientosInventarioComponent} from './administracion/movimientos-inventario/movimientos-inventario.component';
import {CorteComponent} from './administracion/corte/corte.component';

const routes: Routes = [
  { path: 'ingresar', component: LoginAdminComponent },
  { path: '', component: InicioComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/usuarios', component: UsuariosComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/sucursales', component: SucursalesComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/unidadmedida', component: UnidadesMedidaComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/proveedores', component: ProveedoresComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/productos', component: ProductoComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/lineas', component: LineasComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/categorias', component: CategoriasComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/clientes', component: ClientesComponent, canActivate: [AutenticadoService] },
  { path: 'ventas', component: VentasComponent, canActivate: [AutenticadoService] },
  { path: 'servicio/detalle-fichas', component: DetalleFichasComponent, canActivate: [AutenticadoService] },
  { path: 'catalogos/roles', component: RolesComponent , canActivate: [AutenticadoService] },
  { path: 'inventarios/rolesmovimientos-inventario', component: MovimientosInventarioComponent , canActivate: [AutenticadoService] },
  { path: 'inventarios/corte', component: CorteComponent , canActivate: [AutenticadoService] },




  { path: '**', component: LoginAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

