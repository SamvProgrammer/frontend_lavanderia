import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './administracion/login-admin/login-admin.component';
import { UsuariosComponent } from '../app/administracion/usuarios/usuarios.component';
import { AutenticadoService } from './providers/autenticado.service';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { SucursalesComponent } from './administracion/sucursales/sucursales.component';
import { UnidadesMedidaComponent } from './administracion/unidades-medida/unidades-medida.component';
<<<<<<< HEAD
<<<<<<< HEAD
import {ProveedoresComponent} from './administracion/proveedores/proveedores.component';
import {ClientesComponent} from './administracion/clientes/clientes.component';
=======
=======
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b
import { ProveedoresComponent } from './administracion/proveedores/proveedores.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { LineasComponent } from './administracion/lineas/lineas.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
<<<<<<< HEAD
>>>>>>> 95de3415ece1c07e94c729cf11394cca43ff5441
=======
import { ClientesComponent } from './administracion/clientes/clientes.component';
import { VentasComponent } from './administracion/ventas/ventas.component';
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b

const routes: Routes = [
  {path: 'ingresar', component : LoginAdminComponent},
  {path:'',component:InicioComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/usuarios',component:UsuariosComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/sucursales',component:SucursalesComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/unidadmedida',component:UnidadesMedidaComponent,canActivate:[AutenticadoService]},
<<<<<<< HEAD
<<<<<<< HEAD
  {path:'catalogos/proveedores',component:ProveedoresComponent, canActivate:[AutenticadoService]},
  {path:'catalogos/clientes',component:ClientesComponent, canActivate:[AutenticadoService]},



=======
=======
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b
  {path:'catalogos/proveedores',component:ProveedoresComponent,canActivate:[AutenticadoService]},
  {path:'catalogos/productos',component:ProductoComponent,canActivate:[AutenticadoService]},
  {path:'catalogos/lineas',component:LineasComponent,canActivate:[AutenticadoService]},
  {path:'catalogos/categorias',component:CategoriasComponent,canActivate:[AutenticadoService]},
<<<<<<< HEAD
>>>>>>> 95de3415ece1c07e94c729cf11394cca43ff5441
=======
  {path:'catalogos/clientes',component:ClientesComponent,canActivate:[AutenticadoService]},
  {path:'ventas',component:VentasComponent,canActivate:[AutenticadoService]},
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b
  {path:'**',component : LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

