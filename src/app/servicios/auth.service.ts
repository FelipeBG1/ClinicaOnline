import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logeado: any = false;
  loading =  false;
  usuarioRetornado: any;
  constructor(private auth : AngularFireAuth, private fs : FirestoreService, private router : Router, private ts : ToastrService) { }


  login(usuario : any)
  {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(usuario.mail,usuario.password).then(async (res : any) =>{
    this.fs.traerUsuario(usuario.mail);
      this.logeado = true;
      setTimeout(() => {
        if(usuario.mail !== "especialista@gmail.com" && usuario.mail !== "paciente@gmail.com" && usuario.mail !== "admin@gmail.com")
        {
          if(this.fs.usuario.perfil === "paciente")
          {
            if(res.user.emailVerified)
            {
              this.loading = false;
              this.logeado = this.fs.usuario;
              this.router.navigate(["/bienvenido"])
            }
            else
            {
              this.ts.error("Debe verificar el email","Email no verificado");
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
                  this.logeado = this.fs.usuario;
                  this.router.navigate(["/bienvenido"])
                }
                else
                {
                  this.ts.error("Su cuenta se encuentra inhabilitada o no ha sido habilitada","Error con la cuenta");
                  this.loading = false;
                }
              }
              else
              {
                this.ts.error("Debe verificar el email","Email no verificado");
                this.loading = false;
              }
            }
          }
        }
        else
        {
          this.loading = false;
          this.logeado = this.fs.usuario;
          this.router.navigate(["/bienvenido"]);
        }
      }, 2000);
    })
    .catch((error : any) =>
    {
      setTimeout(() => {
        if(error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found')
        {
          this.loading = false;
          this.ts.error("El email o la password son incorrector","Error datos inválidos");
        }
      }, 2000);
    })

  }

  registro(usuario : any)
  {
    return this.auth.createUserWithEmailAndPassword(usuario.mail,usuario.password);
  }
}

