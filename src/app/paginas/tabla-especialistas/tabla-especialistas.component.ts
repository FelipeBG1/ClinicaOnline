import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.scss']
})
export class TablaEspecialistasComponent implements OnInit {

  @Output() especialistaEvent = new EventEmitter<Especialista>();
  
  especialistas : any = "";
  
  constructor(public fs : FirestoreService) {
    this.cargarTabla();
   }

  ngOnInit(): void {
  }

  cargarTabla()
  {
    this.fs.traerEspecialistas().subscribe(value =>{
      this.especialistas = value;
    });
  }

  cambiarEstadoCuenta(especialista : any, estado : number)
  {
    if(estado == 1)
    {
      especialista.estadoCuenta = "Habilitada";
      this.fs.modificar(especialista,especialista.id);
    }
    else
    {
      especialista.estadoCuenta = "Inhabilitada";
      this.fs.modificar(especialista,especialista.id);
    }
  }
}
