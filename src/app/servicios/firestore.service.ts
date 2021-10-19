import { Injectable } from '@angular/core';
import { Paciente } from '../interfaces/paciente';
import { Especialista } from '../interfaces/especialista';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  pacienteCollectionReference: any;
  pacientes: Observable<Paciente>;
  especialistaCollectionReference: any;
  especialistas: Observable<Especialista>;
  adminCollectionReference: any;
  admin: Observable<any>;
  usuario: any = "";
  pacientesArray : any = [];
  especialistasArray : any = [];
  admins : any = [];


  constructor(private angularF : AngularFirestore) {

    this.pacienteCollectionReference = this.angularF.collection<Paciente>('pacientes');
    this.pacientes = this.pacienteCollectionReference.valueChanges({idField: 'id'});
    this.especialistaCollectionReference = this.angularF.collection<Especialista>('especialistas');
    this.especialistas = this.especialistaCollectionReference.valueChanges({idField : 'id'});
    this.adminCollectionReference = this.angularF.collection('administradores');
    this.admin = this.adminCollectionReference.valueChanges({idField : 'id'});

    this.traerEspecialistas().subscribe(value => {
      this.especialistasArray = value;
    });
    this.traerPacientes().subscribe(value => {
      this.pacientesArray = value;
    });
    this.traerAdmins().subscribe(value => {
      this.admins = value;
    });
   }

   traerPacientes()
   {
     return this.pacientes;
   }

   traerEspecialistas()
   {
     return this.especialistas;
   }

   traerAdmins()
   {
     return this.admin;
   }

   agregarPaciente(paciente : Paciente)
   {
     this.pacienteCollectionReference.add({...paciente});
   }

   agregarEspecialista(especialista : Especialista)
   {
     this.especialistaCollectionReference.add({...especialista});
   }

   agregarAdmin(admin : any)
   {
     this.adminCollectionReference.add({...admin});
   }

   traerUsuario(mail : string)
   {
      for(let especialista of this.especialistasArray)
      {
        if(especialista.mail == mail)
        {
          this.usuario = especialista;
        }
      }
      for(let paciente of this.pacientesArray)
      {
        if(paciente.mail == mail)
        {
          this.usuario = paciente;
        }
      }
      for(let admin of this.admins)
      {
        if(admin.mail == mail)
        {
          this.usuario = admin;
        }
      }
   }

  modificar(especialista : any, id : any)
  {
    return this.angularF.collection('especialistas').doc(id).update(especialista);
  }
}