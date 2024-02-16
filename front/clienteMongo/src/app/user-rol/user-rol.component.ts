import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, identity } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
import { Rol, Task, User } from '../user';

@Component({
  selector: 'app-user-rol',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './user-rol.component.html',
  styleUrl: './user-rol.component.css'
})
export class UserRolComponent {
  constructor(private service:PeticionesService) {
  
  }
  userForm={id_rol:0,id_user:0}
    subscripcion: Subscription = new Subscription;
    lista: Array<UrlD> = [
  
    {nombre:'addRolToUser',url:'http://localhost:9090/api/user/rol',verbo:'post',requireId:true,tabla:'rolAssigned'},
    {nombre:'removeRolToUser',url:'http://localhost:9090/api/user/rol',verbo:'delete',requireId:true,tabla:'rolAssigned'},

  ]
    url?:UrlD
    rolUserSelect?:Rol
    genericID=0
   enviarPeticion(){
    switch (this.url?.verbo){
  
      case('post'):{
            this.service.peticionPost(this.url.url,this.userForm).subscribe({
              next:(data)=>{   
                alert('exito: '+data)
              },
              error:(err)=>{
                alert(err)
              }
            })
         
      }
      break;
      case('delete'):{
            this.service.peticionDelete(this.url.url,null,{body:this.userForm}).subscribe({
              next:(data)=>{   
                alert('exito: '+data)
              },
              error:(err)=>{
                alert(err)
              }
            })
          break;
  
        }
      }
    }
}
