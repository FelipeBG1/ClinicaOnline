import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LogedGuard } from './guards/loged.guard';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { ErrorAdminComponent } from './paginas/error-admin/error-admin.component';
import { ErrorLogeoComponent } from './paginas/error-logeo/error-logeo.component';
import { ErrorComponent } from './paginas/error/error.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilesRegistroComponent } from './paginas/perfiles-registro/perfiles-registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';
import { TablaEspecialistasComponent } from './paginas/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from './paginas/tabla-pacientes/tabla-pacientes.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'bienvenido'},
  {path: 'registro', component: PerfilesRegistroComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', loadChildren: () => import('./modulos/usuarios/usuarios.module').then(m => m.UsuariosModule),canActivate: [LogedGuard,AdminGuard]},
  {path: 'errorLogeo', component: ErrorLogeoComponent},
  {path: 'errorAdmin', component: ErrorAdminComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
