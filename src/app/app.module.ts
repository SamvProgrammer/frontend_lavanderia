import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule} from '@angular/forms'; 
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

import { PanelControlComponent } from './administracion/panel-control/panel-control.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { SucursalesComponent } from './administracion/sucursales/sucursales.component';
import { UnidadesMedidaComponent } from './administracion/unidades-medida/unidades-medida.component';
import { ProveedoresComponent } from './administracion/proveedores/proveedores.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { EmpleadosComponent } from './administracion/empleados/empleados.component';
import { ClientesComponent } from './administracion/clientes/clientes.component';
=======
=======
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b
import { ProductoComponent } from './administracion/producto/producto.component';
import { LineasComponent } from './administracion/lineas/lineas.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { CatCategoriasComponent } from './administracion/catalogos/cat-categorias/cat-categorias.component';
<<<<<<< HEAD
>>>>>>> 95de3415ece1c07e94c729cf11394cca43ff5441
=======
import { ClientesComponent } from './administracion/clientes/clientes.component';
import { VentasComponent } from './administracion/ventas/ventas.component';
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b

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
<<<<<<< HEAD
<<<<<<< HEAD
    EmpleadosComponent,
    ClientesComponent
=======
    ProductoComponent,
    LineasComponent,
    CategoriasComponent,
    CatCategoriasComponent
>>>>>>> 95de3415ece1c07e94c729cf11394cca43ff5441
=======
    ProductoComponent,
    LineasComponent,
    CategoriasComponent,
    CatCategoriasComponent,
    ClientesComponent,
    VentasComponent
>>>>>>> b5acd8991c5bea330ab9ec8078fa9597c721b26b
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
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    SucursalesService,
    UnidadesMedidasService,
    ProveedoresService,
    CategoriasService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
