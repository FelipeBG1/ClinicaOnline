import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from '@firebase/util';
import { AuthService } from 'src/app/servicios/auth.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {

  formData : FormData;
  form : FormGroup;
  usuario : any;
  archivo : any = "";

  constructor(private fb : FormBuilder, public as : AuthService, private fs : FirestoreService, private imageService : ImagenesService) {
    this.form = this.fb.group({
      'nombre' : ['',Validators.required],
      'apellido' : ['',Validators.required,Validators.email],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(85)]],
      'dni' : ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],
      'imagen' : [null,Validators.required]
    });
    this.formData = new FormData();
   }

  ngOnInit(): void {
  }

  registrar()
  {
    this.usuario = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      edad : this.form.get('edad')?.value,
      dni : this.form.get('dni')?.value,
      mail : this.form.get('mail')?.value,
      password : this.form.get('password')?.value,
      perfil : "admin",
      imagen : [null]
    }

    this.registrarse();
  }

  registrarse()
  {
    this.as.registro(this.usuario).then(async res =>{
      this.as.loading = true;
      this.as.logeado = this.usuario;
      await this.subirFoto();
      
      setTimeout(() => {
        console.log("Admin registrado");
        this.as.loading = false;
      }, 2000);
    })
    .catch((error : any)=>{
      console.log("Error, admin no registrado");
    })
  }

  change($event : any)
  {
    if($event.target.files.length > 0)
    {
      for(let i = 0; i < $event.target.files.length; i++)
      {
          this.archivo = $event.target.files[i].name;

          this.formData.delete(`archivo${i}`);
          this.formData.append(`archivo${i}`, $event.target.files[i], $event.target.files[i].name);
      }
    }
  }

  async subirFoto()
  {
    let archive = this.formData.get('archivo0');

    this.archivo = Date.now() + this.archivo;

    console.log(this.archivo);

    let referencia1 = this.imageService.referenciaArchivo(this.archivo);

    await this.imageService.subirImagen(this.archivo,archive);

    referencia1.getDownloadURL().subscribe((url1 : any) =>{
        this.usuario.imagen = url1;
        this.fs.agregarAdmin(this.usuario);
    });
  }
}
