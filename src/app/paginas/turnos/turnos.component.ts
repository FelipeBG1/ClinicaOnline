import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Turno } from 'src/app/interfaces/turno';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  turnos : any = "";
  todosLosTurnos : any = "";
  especialidadBuscar : string = "";
  especialistaBuscar : string = "";
  cancelado : boolean = false;
  form : FormGroup;
  claseCardCancelado = 'card text-dark bg-danger';
  claseCardEspera = 'card text-dark bg-warning';
  constructor(private turnoService : TurnoService,private fb : FormBuilder, private ts : ToastrService) 
  {
    this.form = this.fb.group({
      'comentario' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]]
    });
    this.turnoService.traerTurnos().subscribe(value =>{
      this.turnos = value;
      this.todosLosTurnos = value;

    });
  }

  ngOnInit(): void {
  }

  buscar()
  {
    if(this.especialistaBuscar != "" && this.especialidadBuscar == "")
    {
      this.especialistaBuscar = this.arreglarPalabra(this.especialistaBuscar);
      this.todosLosTurnos = this.turnos.filter((turno : any) => turno.especialista.nombre === this.especialistaBuscar);
    }
    else
    {
      if(this.especialistaBuscar == "" && this.especialidadBuscar != "")
      {
        this.especialidadBuscar = this.arreglarPalabra(this.especialidadBuscar);
        this.todosLosTurnos = this.turnos.filter((turno : any) => turno.especialidad.nombre === this.especialidadBuscar);
      }
      else
      {
        if(this.especialistaBuscar != "" && this.especialidadBuscar != "")
        {
          this.especialistaBuscar = this.arreglarPalabra(this.especialistaBuscar);
          this.especialidadBuscar = this.arreglarPalabra(this.especialidadBuscar);
          this.todosLosTurnos = this.turnos.filter((turno : any) => turno.especialidad.nombre === this.especialidadBuscar && turno.especialista.nombre === this.especialistaBuscar);
        }
        else
        {
          this.todosLosTurnos = this.turnos;
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
    turno.estado = "Cancelado";
    turno.comentarioAdministrador = this.form.get("comentario")?.value;
    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      setTimeout(() => {
        this.ts.success("Se ha cancelado el turno","Cancelado");
      }, 1000);
    })
    .catch((response : any) => {
      console.log(response);
      setTimeout(() => {
        this.ts.error("No se canceló el turno","Error al cancelar");
      }, 1000);
    });
  }
}
