import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from '@firebase/util';
import { AuthService } from 'src/app/servicios/auth.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form : FormGroup;
  tipoUsuario : string = "";
  user : any = "";
  archivo1 : string = "";
  archivo2 : string = "";
  formData : FormData;
  especialidades : string[] = ["Cardiología","Pediatría","Obstetricia","Gastroenterología"];

  @Input() set tipo(value: any){
    this.tipoUsuario = value;
    if(this.tipoUsuario == "especialista")
    {
      this.registroEspecialista();
    }
    else
    {
      if(this.tipoUsuario == "paciente")
      {
        this.registroPaciente();
      }
      else
      {
        this.registroAdministrador();
      }
    }
  }

  constructor(private fb : FormBuilder, public as : AuthService, private imageStore : ImagenesService, private fs : FirestoreService) {
    this.form = this.fb.group({});
    this.formData = new FormData();
    
   }

  ngOnInit(): void {
  }

  registroEspecialista()
  {
    this.form = this.fb.group({
      'nombre' : ['',Validators.required],
      'apellido' : ['',Validators.required,Validators.email],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(85)]],
      'dni' : ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      'especialidad' : ['',[Validators.required, Validators.maxLength(20)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],
      'imagen' : [null,Validators.required] 
    });
  }

  registroPaciente()
  {
    this.form = this.fb.group({
      'nombre' : ['',Validators.required],
      'apellido' : ['',Validators.required,Validators.email],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(85)]],
      'dni' : ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      'obraSocial' : ['',[Validators.required, Validators.maxLength(20)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],
      'imagen' : [null,Validators.required]
    });
  }

  registroAdministrador()
  {
    this.form = this.fb.group({
      'nombre' : ['',Validators.required],
      'apellido' : ['',Validators.required,Validators.email],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(85)]],
      'dni' : ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],
      'imagen' : [null]
    });
  }

  registrar()
  {
    if(this.tipoUsuario == "paciente")
    {
      this.user = {
        nombre : this.form.get('nombre')?.value,
        apellido : this.form.get('apellido')?.value,
        edad : this.form.get('edad')?.value,
        dni : this.form.get('dni')?.value,
        obraSocial : this.form.get('obraSocial')?.value,
        mail : this.form.get('mail')?.value,
        password : this.form.get('password')?.value,
        perfil : this.tipoUsuario,
        imagenes : []
      }
    }
    else
    {
      if(this.tipoUsuario == "especialista")
      {
        this.user = {
          nombre : this.form.get('nombre')?.value,
          apellido : this.form.get('apellido')?.value,
          edad : this.form.get('edad')?.value,
          dni : this.form.get('dni')?.value,
          especialidad : this.form.get('especialidad')?.value,
          mail : this.form.get('mail')?.value,
          password : this.form.get('password')?.value,
          perfil : this.tipoUsuario,
          imagen : 'null'
        }
      }
      else
      {
        this.user = {
          nombre : this.form.get('nombre')?.value,
          apellido : this.form.get('apellido')?.value,
          edad : this.form.get('edad')?.value,
          dni : this.form.get('dni')?.value,
          mail : this.form.get('mail')?.value,
          password : this.form.get('password')?.value,
          perfil : "admin"
        }
      }
    }

    this.registrarse();
  }

  registrarse()
  {
    this.as.registro(this.user).then(async res =>{
      this.as.loading = true;
      this.as.logeado = this.user;
      await this.subirFoto();
      await res.user?.sendEmailVerification();
      
      setTimeout(() => {
        console.log("Usuario registrado");
      }, 2000);
      this.as.loading = false;
    })
    .catch((error : any)=>{
      console.log("Error, usuario no registrado");
    })
  }

  change($event : any)
  {
    if($event.target.files.length > 0)
    {
      for(let i = 0; i < $event.target.files.length; i++)
      {
        if(i === 0)
        {
          this.archivo1 = $event.target.files[i].name;
        }
        else
        {
          this.archivo2 = $event.target.files[i].name;
        }

        this.formData.delete(`archivo${i}`);
        this.formData.append(`archivo${i}`, $event.target.files[i], $event.target.files[i].name);
      }
    }
  }

  async subirFoto()
  {
    let archive1 = this.formData.get('archivo0');
    let archive2 = this.formData.get('archivo1');

    this.archivo1 = Date.now() + this.archivo1;
    this.archivo2 = Date.now() + this.archivo2;

    console.log(this.archivo1);

    let referencia1 = this.imageStore.referenciaArchivo(this.archivo1);
    let referencia2 = this.imageStore.referenciaArchivo(this.archivo2);

    await this.imageStore.subirImagen(this.archivo1,archive1);
    await this.imageStore.subirImagen(this.archivo2,archive2);

    referencia1.getDownloadURL().subscribe((url1 : any) =>{

      if(this.tipoUsuario == "especialista")
      {
        this.user.imagen = url1;
        this.fs.agregarEspecialista(this.user);
      }
      else
      {
        if(this.tipoUsuario == "admin")
        {
          this.fs.agregarPaciente(this.user);
        }
        else
        {
          this.user.imagenes.push(url1);
          console.log(this.user.imagenes);

          referencia2.getDownloadURL().subscribe((url2 : any) =>{
            this.user.imagenes.push(url2);
            this.fs.agregarPaciente(this.user);
          });
        }
      }
    });
  }
}
