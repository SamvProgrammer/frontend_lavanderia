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

import { PanelControlComponent } from './administracion/panel-control/panel-control.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { SucursalesComponent } from './administracion/sucursales/sucursales.component';
import { UnidadesMedidaComponent } from './administracion/unidades-medida/unidades-medida.component';
import { ProveedoresComponent } from './administracion/proveedores/proveedores.component';
import { EmpleadosComponent } from './administracion/empleados/empleados.component';
import { ClientesComponent } from './administracion/clientes/clientes.component';

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
    EmpleadosComponent,
    ClientesComponent
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
    ProveedoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
