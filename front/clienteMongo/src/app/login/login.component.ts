import { Component, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private servicio:PeticionesService){}
  email:string=''
  password:string=''
  logueado:EventEmitter<boolean>=new EventEmitter
  @Input() isLogged?:any
  login(){
    this.servicio.login(this.email,this.password).subscribe({
      next:(data)=>{
        sessionStorage.setItem('token',data.token)
        this.isLogged.value=true
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}