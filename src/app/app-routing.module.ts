import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LogedGuard } from './guards/loged.guard';
import { PacienteAdministradorGuard } from './guards/paciente-administrador.guard';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { ErrorAdminComponent } from './paginas/error-admin/error-admin.component';
import { ErrorLogeoComponent } from './paginas/error-logeo/error-logeo.component';
import { ErrorPacienteAdministradorComponent } from './paginas/error-paciente-administrador/error-paciente-administrador.component';
import { ErrorPacienteEspecialistaComponent } from './paginas/error-paciente-especialista/error-paciente-especialista.component';
import { ErrorComponent } from './paginas/error/error.component';
import { LoginComponent } from './paginas/login/login.component';
import { MiPerfilComponent } from './paginas/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './paginas/mis-turnos/mis-turnos.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { PerfilesRegistroComponent } from './paginas/perfiles-registro/perfiles-registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';
import { SolicitarTurnoComponent } from './paginas/solicitar-turno/solicitar-turno.component';
import { TablaEspecialistasComponent } from './paginas/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from './paginas/tabla-pacientes/tabla-pacientes.component';
import { TurnosComponent } from './paginas/turnos/turnos.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'bienvenido'},
  {path: 'registro', component: PerfilesRegistroComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', loadChildren: () => import('./modulos/usuarios/usuarios.module').then(m => m.UsuariosModule),canActivate: [LogedGuard,AdminGuard]},
  {path: 'perfil', component: MiPerfilComponent},
  {path: 'turnos', loadChildren: () => import('./modulos/turnos/turnos.module').then(m => m.TurnosModule),canActivate: [LogedGuard]},
  {path: 'perfilGeneral', component: PerfilComponent,canActivate: [LogedGuard]},
  {path: 'errorLogeo', component: ErrorLogeoComponent},
  {path: 'errorAdmin', component: ErrorAdminComponent},
  {path: 'errorPacienteEspecialista', component: ErrorPacienteEspecialistaComponent},
  {path: 'errorPacienteAdministrador', component: ErrorPacienteAdministradorComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
