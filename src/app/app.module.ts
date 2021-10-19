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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
