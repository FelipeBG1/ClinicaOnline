import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  pacientes : any = "";
  constructor(private fs : FirestoreService) {
    this.cargarTabla();
   }

  ngOnInit(): void {
  }

  cargarTabla()
  {
    this.fs.traerPacientes().subscribe(value =>{
      this.pacientes = value;
    })
  }

}
