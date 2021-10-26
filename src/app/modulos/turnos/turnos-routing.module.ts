import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { LogedGuard } from 'src/app/guards/loged.guard';
import { PacienteAdministradorGuard } from 'src/app/guards/paciente-administrador.guard';
import { PacienteEspecialistaGuard } from 'src/app/guards/paciente-especialista.guard';
import { MisTurnosComponent } from 'src/app/paginas/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from 'src/app/paginas/solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from 'src/app/paginas/turnos/turnos.component';

const routes: Routes = [
  {path: 'gestionarTurnos',component: TurnosComponent,canActivate: [LogedGuard,AdminGuard]},
  {path: 'solicitarTurno',component: SolicitarTurnoComponent,canActivate: [LogedGuard,PacienteAdministradorGuard]},
  {path: 'misTurnos',component: MisTurnosComponent,canActivate: [LogedGuard,PacienteEspecialistaGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
