import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  turnos : any = "";
  formComentario : FormGroup;
  formEncuesta : FormGroup;
  formFinalizado : FormGroup;
  todosLosTurnos : any = "";
  turnosFiltrados : any = "";
  turnosFiltradosEspecialista : any = "";
  especialidadBuscar : string = "";
  pacienteBuscar : string = "";
  especialistaBuscar : string = "";
  cancelado : boolean = false;
  verResena : boolean = false;
  encuesta : boolean = false;
  calificar : boolean = false;
  atencion : string = "";
  finalizado : boolean = false;
  rechazado : boolean = false;
  atencionAdministracion : string = "";
  respetoHorario : string = "";


  constructor(public as : AuthService, private turnoService : TurnoService, private fb : FormBuilder,private fb2 : FormBuilder,private fb3 : FormBuilder, private ts : ToastrService) {
    this.formComentario = this.fb.group({
      'comentario' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]]
    });
    this.formEncuesta = this.fb2.group({
      'agregado' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]]
    });
    this.formFinalizado = this.fb3.group({
      'comentario' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]],
      'diagnostico' : ['',[Validators.required,Validators.maxLength(60),Validators.minLength(15)]],
    });

    this.turnoService.traerTurnos().subscribe(value => 
      {
        this.turnos = value;
        if(this.as.logeado.pefil == "paciente")
        {
          this.todosLosTurnos = this.turnos.filter((turno : any) => turno.paciente.dni == this.as.logeado.dni);
          this.turnosFiltrados = this.todosLosTurnos;
        }
        else
        {
          if(this.as.logeado.perfil == "especialista")
          {
            this.todosLosTurnos = this.turnos.filter((turno : any) => turno.especialista.dni == this.as.logeado.dni);
            this.turnosFiltradosEspecialista = this.todosLosTurnos;
          }
        }

      });
   }

  ngOnInit(): void {
  }

  buscar()
  {
    if(this.especialistaBuscar != "" && this.especialidadBuscar == "")
    {
      this.especialistaBuscar = this.arreglarPalabra(this.especialistaBuscar);
      this.todosLosTurnos = this.turnosFiltrados.filter((turno : any) => turno.especialista.nombre === this.especialistaBuscar);
    }
    else
    {
      if(this.especialistaBuscar == "" && this.especialidadBuscar != "")
      {
        this.especialidadBuscar = this.arreglarPalabra(this.especialidadBuscar);
        this.todosLosTurnos = this.turnosFiltrados.filter((turno : any) => turno.especialidad.nombre === this.especialidadBuscar);
      }
      else
      {
        if(this.especialistaBuscar != "" && this.especialidadBuscar != "")
        {
          this.especialistaBuscar = this.arreglarPalabra(this.especialistaBuscar);
          this.especialidadBuscar = this.arreglarPalabra(this.especialidadBuscar);
          this.todosLosTurnos = this.turnosFiltrados.filter((turno : any) => turno.especialidad.nombre === this.especialidadBuscar && turno.especialista.nombre === this.especialistaBuscar);
        }
        else
        {
          this.todosLosTurnos = this.turnosFiltrados;
        }
      }
    }
  }

  buscarPacEspecialidad()
  {
    console.log(this.pacienteBuscar);
    console.log(this.especialidadBuscar);

    if(this.pacienteBuscar != "" && this.especialidadBuscar == "")
    {
      this.pacienteBuscar = this.arreglarPalabra(this.pacienteBuscar);
      this.todosLosTurnos = this.turnosFiltradosEspecialista.filter((turno : any) => turno.paciente.nombre === this.pacienteBuscar);
    }
    else
    {
      if(this.pacienteBuscar == "" && this.especialidadBuscar != "")
      {
        this.especialidadBuscar = this.arreglarPalabra(this.especialidadBuscar);
        this.todosLosTurnos = this.turnosFiltradosEspecialista.filter((turno : any) => turno.especialidad.nombre === this.especialidadBuscar);
      }
      else
      {
        if(this.pacienteBuscar != "" && this.especialidadBuscar != "")
        {
          this.pacienteBuscar = this.arreglarPalabra(this.pacienteBuscar);
          this.especialidadBuscar = this.arreglarPalabra(this.especialidadBuscar);
          this.todosLosTurnos = this.turnosFiltradosEspecialista.filter((turno : any) => turno.especialidad.nombre === this.especialidadBuscar && turno.paciente.nombre === this.pacienteBuscar);
        }
        else
        {
          this.todosLosTurnos = this.turnosFiltradosEspecialista;
        }
      }
    }
  }

  arreglarPalabra(palabra : string)
  {
    let palabraArreglada : string;
    let aux1 : string;
    let aux2 : string;
    let letra : string;
    let letraModificar : string;

    palabraArreglada = palabra.toLowerCase();

    letra = palabraArreglada.charAt(0).toUpperCase();

    letraModificar = palabraArreglada.substring(0);
    aux2 = palabraArreglada.substring(1,palabraArreglada.length);
    aux1 = palabraArreglada.replace(letraModificar,letra);
    palabraArreglada = aux1 + aux2;

    return palabraArreglada;
  }

  modificarTurnoBD(turno : any, id : any)
  {
    return this.turnoService.modificarTurno(turno,id);
  }

  cancelarTurno(turno : any)
  {
    if(this.as.logeado.perfil == "paciente")
    {
      turno.estado = "Cancelado";
      turno.comentarioPaciente = this.formComentario.get("comentario")?.value;
    }
    else
    {
      if(this.as.logeado.perfil == "especialista")
      {
        if(this.cancelado)
        {
          turno.estado = "Cancelado";
          turno.comentarioEspecialista = this.formComentario.get("comentario")?.value;
        }
        else
        {
          if(this.rechazado)
          {
            turno.estado = "Rechazado";
            turno.comentarioEspecialista = this.formComentario.get("comentario")?.value;
          }
        }
      }
    }
    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      this.ts.success("Se ha cancelado el turno","Cancelado");
      this.cancelado = false;
      this.rechazado = false;
      this.formComentario.get("comentario")?.setValue('');
    })
    .catch((response : any) => {
      console.log(response);
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se canceló el turno","Error al cancelar");
      }, 1000);
      this.as.loading = false;
    });
  }

  cargarEncuesta(turno : any)
  {
    let encuestaAAgregar = {
      atencionAdministracion : this.atencionAdministracion,
      respetoHorarioConsulta : this.respetoHorario,
      agregado : this.formEncuesta.get("agregado")?.value
    }; 

    turno.encuesta = encuestaAAgregar;

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
     
      this.ts.success("Se ha cargado la encuesta","Encuesta");
      this.encuesta = false;
      this.formEncuesta.get("agregado")?.setValue('');
      this.atencionAdministracion = "";
      this.respetoHorario = "";
      
    })
    .catch((response : any) => {
      console.log(response);
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se cargo la encuesta","Error con la encuesta");
      }, 1000);
      this.as.loading = false;
    });
  }

  cargarCalificacion(turno : any)
  {
    turno.atencion = this.atencion;

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      
      this.ts.success("Se ha cargado la calificación","Calificación");
      this.calificar = false;
      this.atencion = "";
    })
    .catch((response : any) => {
      console.log(response);
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se cargo la calificación","Error con la calificación");
      }, 1000);
      this.as.loading = false;
    });
  }

  finalizarTurno(turno : any)
  {
    turno.estado = "Realizado";
    turno.comentarioConsulta = this.formFinalizado.get("comentario")?.value;
    turno.diagnostico = this.formFinalizado.get("diagnostico")?.value;

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      
      this.ts.success("Se ha realizado el turno","Realizado");
      this.finalizado = false;
     
    })
    .catch((response : any) => {
      console.log(response);
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se realizo el turno","Error con la realización");
      }, 1000);
      this.as.loading = false;
    });
  }

  aceptarTurno(turno : any)
  {
    this.rechazado = false;
    this.cancelado = false;
    turno.estado = "Aceptado";

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      
      this.ts.success("Se ha aceptado el turno","Aceptado");
    })
    .catch((response : any) => {
      console.log(response);
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se aceptó el turno","Error al aceptar el turno");
      }, 1000);
      this.as.loading = false;
    });
  }
}
