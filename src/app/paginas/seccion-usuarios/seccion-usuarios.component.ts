import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {

  tipoUsuario : any = "";
  constructor() { }

  ngOnInit(): void {
  }

  cargarTipo(tipo : number)
  {
    if(tipo == 1)
    {
      this.tipoUsuario = "paciente";
    }
    else
    {
      if(tipo == 2)
      {
        this.tipoUsuario = "especialista";
      }
      else
      {
        this.tipoUsuario = "admin";
      }
    }
  }
}
