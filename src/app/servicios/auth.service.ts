import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logeado: any = false;
  loading =  false;
  usuarioRetornado: any;
  constructor(private auth : AngularFireAuth, private fs : FirestoreService, private router : Router) { }


  login(usuario : any)
  {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(usuario.mail,usuario.password).then(async (res : any) =>{
    this.fs.traerUsuario(usuario.mail);
      this.logeado = true;
      setTimeout(() => {
        if(this.fs.usuario.perfil === "paciente")
        {
          if(res.user.emailVerified)
          {
            this.loading = false;
            this.router.navigate(["/bienvenido"])
          }
          else
          {
            console.log("Verifica el mail crack");
            this.loading = false;
          }
        }
        else
        {
          if(this.fs.usuario.perfil === "especialista")
          {
            if(res.user.emailVerified)
            {
              if(this.fs.usuario.estadoCuenta === "Habilitada")
              {
                this.loading = false;
                this.router.navigate(["/bienvenido"])
              }
              else
              {
                console.log("Su cuenta se encuentra inabilitada o no ha sido habilitada");
                this.loading = false;
              }
            }
            else
            {
              console.log("Verifica el mail crack");
              this.loading = false;
            }
          }
        }
      }, 2000);
    })
    .catch((error : any) =>
    {
      setTimeout(() => {
        this.loading = false;
        console.log("Error");
      },2000);
    })

  }

  registro(usuario : any)
  {
    return this.auth.createUserWithEmailAndPassword(usuario.mail,usuario.password);
  }
}

