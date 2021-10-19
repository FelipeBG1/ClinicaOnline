import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAdminComponent } from 'src/app/paginas/registro-admin/registro-admin.component';
import { TablaEspecialistasComponent } from 'src/app/paginas/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from 'src/app/paginas/tabla-pacientes/tabla-pacientes.component';

const routes: Routes = [
  {path: 'especialistas', component: TablaEspecialistasComponent},
  {path: 'pacientes', component: TablaPacientesComponent},
  {path: 'registroAdmin',component: RegistroAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
