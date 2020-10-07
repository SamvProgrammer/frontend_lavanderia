import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './administracion/login-admin/login-admin.component';


import { LoginService } from './providers/login.service';
import { UsuariosService } from './providers/usuarios.service';
import { AutenticadoService } from './providers/autenticado.service';
import { SucursalesService } from './providers/sucursales.service';
import { UnidadesMedidasService } from './providers/unidades-medidas.service';
import { ProveedoresService } from './providers/proveedores.service';
import { CategoriasService } from './providers/categorias.service';
import { ProductosService } from './providers/productos.service';
import { RolesService } from './providers/roles.service';
import { ServiciosService } from './providers/servicios.service';

import { PanelControlComponent } from './administracion/panel-control/panel-control.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { SucursalesComponent } from './administracion/sucursales/sucursales.component';
import { UnidadesMedidaComponent } from './administracion/unidades-medida/unidades-medida.component';
import { ProveedoresComponent } from './administracion/proveedores/proveedores.component';

import { ClientesComponent } from './administracion/clientes/clientes.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { LineasComponent } from './administracion/lineas/lineas.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { CatCategoriasComponent } from './administracion/catalogos/cat-categorias/cat-categorias.component';
import { VentasComponent } from './administracion/ventas/ventas.component';
import { DetalleFichasComponent } from './administracion/detalle-fichas/detalle-fichas.component';
import { CatClientesComponent } from './administracion/catalogos/cat-clientes/cat-clientes.component';
import { CatProductosComponent } from './administracion/catalogos/cat-productos/cat-productos.component';
import { RolesComponent } from './administracion/roles/roles.component';
import { CatMenuComponent } from './administracion/catalogos/cat-menu/cat-menu.component';
import { MovimientosInventarioComponent } from './administracion/movimientos-inventario/movimientos-inventario.component';
import { TabsVentasComponent } from './administracion/tabs-ventas/tabs-ventas.component';
import { TransaccionComponent } from './administracion/transaccion/transaccion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    PanelControlComponent,
    UsuariosComponent,
    InicioComponent,
    SucursalesComponent,
    UnidadesMedidaComponent,
    ProveedoresComponent,
    ProductoComponent,
    LineasComponent,
    CategoriasComponent,
    CatCategoriasComponent,
    LineasComponent,
    CategoriasComponent,
    CatCategoriasComponent,
    ClientesComponent,
    VentasComponent,
    DetalleFichasComponent,
    CatClientesComponent,
    CatProductosComponent,
    RolesComponent,
    CatMenuComponent,
    MovimientosInventarioComponent,
    TabsVentasComponent,
    TransaccionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoginService,
    UsuariosService,
    AutenticadoService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    SucursalesService,
    UnidadesMedidasService,
    ProveedoresService,
    CategoriasService,
    ProductosService,
    RolesService ,
    ServiciosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
