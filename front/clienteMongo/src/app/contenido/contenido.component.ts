import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, identity } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
import { Rol, User } from '../user';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
constructor(private service:PeticionesService) {
  
}
userForm={email:'',password:'',first_name:'',last_name:'',}
userView={id:'',email:'',password:'',first_name:'',last_name:'',}
userList:Array<User>=[{id:0,email:'',password:'',first_name:'',last_name:''}]
  subscripcion: Subscription = new Subscription;
  lista: Array<UrlD> = [

  {nombre:'getAllUser',url:'http://localhost:9090/api/user',verbo:'get',requireId:null,tabla:'user'},
  {nombre:'getUser',url:'http://localhost:9090/api/user',verbo:'get',requireId:true,tabla:'user'},
  {nombre:'insertUser',url:'http://localhost:9090/api/user',verbo:'post',requireId:null,tabla:'user'},
  {nombre:'getAllUserWithRol',url:'http://localhost:9090/api/user/rol',verbo:'get',requireId:null,tabla:'user'},
  {nombre:'updatePasswordToUser',url:'http://localhost:9090/api/user/',verbo:'put',requireId:true,tabla:'user'},
  {nombre:'deleteUser',url:'http://localhost:9090/api/user/',verbo:'delete',requireId:true,tabla:'user'},
]
  url?:UrlD
  rolUserSelect?:Rol
  genericID=0
 enviarPeticion(){
  switch (this.url?.verbo){
    case ('get'):{
      if(this.url.requireId==null){
        this.service.peticionGet(this.url.url,null).subscribe({
          next:(data)=>{
            alert('exito ')
            this.userList=data
              console.log(data)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }else{
        switch (this.url.tabla){
          case('user'):{
            this.service.peticionGet(this.url?.url,this.genericID).subscribe({
              next:(data)=>{
                alert('exito ')
                this.userView=data
                  console.log(data)
              },
              error:(err)=>{
                console.log(err)
              }
            })
          }
          break;
        }
      }
    }
    break;
    case('post'):{
      switch (this.url.tabla){
        case('user'):{
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
        
        
      }
    }
    break;
    case('put'):{
      switch (this.url.tabla){
        case('user'):{
          this.service.peticionPut(this.url.url,this.userForm,this.genericID).subscribe({
            next:(data)=>{   
              alert('exito: '+data)
        
            },
            error:(err)=>{
              alert(err)
            }
          })
        }
        break;
        
        
      }
    }
    break;
    case('delete'):{
          this.service.peticionDelete(this.url.url,this.genericID).subscribe({
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


