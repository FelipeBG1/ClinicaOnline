import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilesRegistroComponent } from './paginas/perfiles-registro/perfiles-registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';
import { TablaEspecialistasComponent } from './paginas/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from './paginas/tabla-pacientes/tabla-pacientes.component';

const routes: Routes = [
  {path: 'registro', component: PerfilesRegistroComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registroAdmin', component: RegistroAdminComponent},
  {path: 'pacientes', component: TablaPacientesComponent},
  {path: 'especialistas', component: TablaEspecialistasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
