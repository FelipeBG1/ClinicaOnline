import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Especialista } from 'src/app/interfaces/especialista';
import { Horario } from 'src/app/interfaces/horario';
import { Paciente } from 'src/app/interfaces/paciente';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { ToastrService } from 'ngx-toastr';
import { Turno } from 'src/app/interfaces/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {


  especialistas : any = "";
  pacientes : any = "";
  especialidades : any = "";
  horarios : any = "";
  tablaEspecialidades : boolean = false;
  tablaEspecialistas : boolean = false;
  tablaPacientes : boolean = false;
  arrayEspecialistasSegunEspecialidad : any = [];
  especialidadSeleccionada : any = "";
  especialistasFiltrados : boolean = false;
  horarioEspecialista : any = ""; 
  especialistaSeleccionado : any = "";
  arrayEspecialistasTodos : any = [];
  especialistasTodos : boolean = false;
  turnos : any = "";
  turno : any = "";
  verTurnos : boolean = false;
  pacienteActual : any = "";
  pacienteCargado : boolean = false;
  todosLosTurnos : any;
  horarioEspecialidad : any = "";
  

  constructor(private fs : FirestoreService, private hs : HorariosService, private es : EspecialidadesService, private ts : ToastrService, public as : AuthService, private turnoService : TurnoService) {
    this.especialistas = this.fs.especialistasArray;

    this.fs.traerEspecialistas().subscribe(value => {
      this.especialistas = value;
    });
    this.es.traerEspecialidades().subscribe(value => {
      this.especialidades = value;
    });
    this.hs.traerHorarios().subscribe(value => {
      this.horarios = value;
    });
    this.fs.traerPacientes().subscribe(value => {
      this.pacientes = value;
    });

    this.turnoService.traerTurnos().subscribe(value =>{
      this.todosLosTurnos = value;
    });
   }

  ngOnInit(): void {
  }

  cargarEspecialidades()
  {
    this.tablaEspecialidades = !this.tablaEspecialidades;
    this.tablaEspecialistas = false;
    this.tablaPacientes = false;
   
  }

  cargarEspecialistas()
  {
    if(!this.tablaEspecialistas)
    {
      this.tablaEspecialistas = true;
      this.tablaEspecialidades = false;
      this.tablaPacientes = false;
      this.cargarTodosEspecialistas();
    }
    else
    {
      this.tablaEspecialistas = false;
    }
  }

  asignarPaciente(paciente : Paciente)
  {
    this.pacienteActual = paciente;
    this.pacienteCargado = true;
  }

  cargarPacientes()
  {
    this.tablaPacientes = !this.tablaPacientes; 
  }

  cargarEspecialistasSegunEspecialidad(especialidad : any)
  {
    this.especialidadSeleccionada = especialidad;
    for(let especialista of this.especialistas) 
    {
      for(let especialidad of especialista.especialidad) 
      {
        if(especialidad.nombre == this.especialidadSeleccionada.nombre)
        {
          this.arrayEspecialistasSegunEspecialidad.push(especialista);
        }
      }
    }
    console.log(this.arrayEspecialistasSegunEspecialidad);
    this.especialistasFiltrados = true;
    this.tablaEspecialidades = false;
  }

  cargarTodosEspecialistas()
  {
    let esp : any;
    let espe : any = "";
    this.arrayEspecialistasTodos = [];

    for(let especialista of this.especialistas) 
    {
      for(let especialidad of especialista.especialidad) 
      {
        esp = especialista;
        esp.especialidad = "";
        esp.especialidad = especialidad;
        console.log(esp);
        this.arrayEspecialistasTodos.push(esp);
        esp = "";
      }
    } 
    
  }


  filtrarHorarios()
  {
    for (let horario of this.horarios) 
    {
      for (let he of horario.horariosEspecialidad) 
      {
        if(horario.especialista.dni == this.especialistaSeleccionado.dni && he.nombre == this.especialidadSeleccionada.nombre)
        {
          this.horarioEspecialista = horario;  
          this.horarioEspecialidad = he;
        }
      }
    }
  }

  seleccionarEspecialista(especialista : any)
  {
    if(this.as.logeado.perfil == "paciente")
    {
      this.pacienteActual = this.as.logeado;
    }

    this.tablaEspecialistas = false;
    this.tablaEspecialidades = false;
    this.especialistaSeleccionado = especialista;
    this.filtrarHorarios();
    this.mostrarTurnos();
    this.verTurnos = true;

  }

  seleccionarEspecialistaV2(especialista : any)
  {
    this.tablaEspecialistas = false;
    this.tablaEspecialidades = false;
    this.especialistaSeleccionado = especialista;
    this.especialidadSeleccionada = this.especialistaSeleccionado.especialidad;
    this.filtrarHorarios();
    this.mostrarTurnos();
    this.verTurnos = true;
  }

  
  estaElTurnoDisponible(fecha : any) {
    return !Boolean(this.todosLosTurnos.filter((turno : any) => turno.especialidad.nombre == this.especialidadSeleccionada.nombre && turno.especialista.dni == this.especialistaSeleccionado.dni && turno.fecha == fecha && ["Aceptado", "Pendiente"].indexOf(turno.estado) != -1).length);
  }

  mostrarTurnos() {
    if (!this.horarioEspecialidad.rangoHorario || this.horarioEspecialidad.rangoHorario.length < 1 || !this.horarioEspecialidad.dias || this.horarioEspecialidad.dias.length < 1) {
      this.ts.error('error', 'El especialista no tiene horarios disponibles');
      return;
    }

    let hoy = new Date();
    let dia = new Date();
    let manana = new Date();

    this.turnos = [];

    let diasActivo;
    let horaEntrada;
    let horaSalida;
    let duracionTurno = 30;
    let turnoConFormato;

    diasActivo = this.horarioEspecialidad.dias;

    horaEntrada = this.horarioEspecialidad.rangoHorario[0].split(':');
    horaSalida = this.horarioEspecialidad.rangoHorario[1].split(':');

    let ultimoTurno;

    for (let contador = 1; contador <= 15; contador++) {
      if (diasActivo.indexOf(dia.getDay()) !== -1) {
        ultimoTurno = dia;

        ultimoTurno.setHours(horaSalida[0], horaSalida[1]);

        
        if (dia.getDay() == 6) {
          ultimoTurno.setHours(14, 0);
        }

        ultimoTurno = new Date(ultimoTurno.getTime() - duracionTurno * 60000);

        dia.setHours(horaEntrada[0], horaEntrada[1]);

        do {
          turnoConFormato = dia.toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', });
        
          if (this.estaElTurnoDisponible(turnoConFormato)) {
            this.turnos.push(turnoConFormato);
          }
          

          dia = new Date(dia.getTime() + duracionTurno * 60000);

        } while (dia <= ultimoTurno);
      }

      manana.setDate(hoy.getDate() + contador);
      dia = manana;
    }

  }
  seleccionarTurno(turnoSeleccionado : any)
  {
    if(this.as.logeado.perfil == "admin")
    {
      this.turno = {
        paciente : this.pacienteActual,
        especialista : this.especialistaSeleccionado,
        especialidad : this.especialidadSeleccionada,
        estado: "Pendiente",
        fecha : turnoSeleccionado
      }
    }
    else
    {
      this.turno = {
        paciente : this.as.logeado,
        especialista : this.especialistaSeleccionado,
        especialidad : this.especialidadSeleccionada,
        estado: "Pendiente",
        fecha : turnoSeleccionado
      }
    }
    
    this.turnoService.agregarTurno(this.turno);
    
    this.as.loading = true
    setTimeout(() => {
      this.ts.success("Turno solicitado","Se ha cargado el turno exitosamente");
      this.as.loading = false;
    }, 2000);
    this.tablaPacientes = false;
    this.tablaEspecialidades = false;
    this.tablaEspecialistas = false;
    this.turnos = [];
    this.verTurnos = false;
    this.especialistasFiltrados = false;
    this.especialistasTodos = false;
    this.pacienteCargado = false;
    this.pacienteActual = "";
  }
  
}
