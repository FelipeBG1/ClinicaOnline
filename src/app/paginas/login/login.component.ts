import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  usuario : any = "";
  constructor(public as : AuthService, private formBuilder : FormBuilder) {
    this.form = this.formBuilder.group({
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required],  
    })
   }

  ngOnInit(): void {
  }

  logearse()
  {
    this.usuario = {
      mail : this.form.get('mail')?.value,
      password : this.form.get('password')?.value 
    }
    this.as.login(this.usuario);
  }

  datosEspecialista()
  {
    this.form.get('mail')?.setValue("especialista@gmail.com");
    this.form.get('password')?.setValue("especialista123");
  }
  datosPaciente()
  {
    this.form.get('mail')?.setValue("paciente@gmail.com");
    this.form.get('password')?.setValue("paciente123");
  }
  datosAdmin()
  {
    this.form.get('mail')?.setValue("admin@gmail.com");
    this.form.get('password')?.setValue("admin123");
  }

}
