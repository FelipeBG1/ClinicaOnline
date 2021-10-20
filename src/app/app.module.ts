import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { LoginComponent } from './paginas/login/login.component';
import { SpinnerComponent } from './paginas/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './../environments/environment';
import { PerfilesRegistroComponent } from './paginas/perfiles-registro/perfiles-registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';
import { TablaPacientesComponent } from './paginas/tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from './paginas/tabla-especialistas/tabla-especialistas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ErrorLogeoComponent } from './paginas/error-logeo/error-logeo.component';
import { ErrorAdminComponent } from './paginas/error-admin/error-admin.component';
import { NavbarComponent } from './paginas/navbar/navbar.component';
import { ErrorComponent } from './paginas/error/error.component';
import { TablaAdminsComponent } from './paginas/tabla-admins/tabla-admins.component';
import { SeccionUsuariosComponent } from './paginas/seccion-usuarios/seccion-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    RegistroComponent,
    LoginComponent,
    SpinnerComponent,
    PerfilesRegistroComponent,
    RegistroAdminComponent,
    TablaPacientesComponent,
    TablaEspecialistasComponent,
    ErrorLogeoComponent,
    ErrorAdminComponent,
    NavbarComponent,
    ErrorComponent,
    TablaAdminsComponent,
    SeccionUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
